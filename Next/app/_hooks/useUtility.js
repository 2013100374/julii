import { useSelector } from 'react-redux';

export default function useUtility() {
    const showAmount = ( amount, currencyFormat = true,decimal = 2,separate = true, exceptZeros = false
    ) => {
        const currencyFormatSetting = gs('currency_format');
        const currencySymbol        = gs('cur_sym');
        const currencyText          = gs('cur_text');
        let   separator             = '';

        if (separate) {
            separator = ',';
        }

        let printAmount = parseFloat(amount).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&' + separator);

        if (exceptZeros) {
            let parts = printAmount.split('.');
            
            if (parseInt(parts[1]) === 0) {
                printAmount = parts[0];
            } else {
                printAmount = printAmount.replace(/0+$/, '');
            }
        }

        if (currencyFormat) {
            if (currencyFormatSetting === 1) {
                return currencySymbol + printAmount + ' ' + currencyText;
            } 
            
            if (currencyFormatSetting === 2) {
                return printAmount + ' ' + currencyText;
            }

            return currencySymbol + printAmount;
        }

        return printAmount;
    }


    const settings = useSelector((state) => state.gs.data);
    const gsStatus = useSelector((state) => state.gs.status);

    const gs = (key) => {
        if (gsStatus != 'succeeded') return 99;
        
        return settings?.data?.general_setting?.[key];
    }

    const language = useSelector((state) => state.language.data);
    const langStatus = useSelector((state) => state.language.status);

    const trans = (key) => {
        if (langStatus === 'loading') return '';

        if (langStatus === 'succeeded') {
            return language?.data?.file?.[key] ?? key;
        } else {
            return '';
        }
    }
    
    return {showAmount,trans,gs}
}
