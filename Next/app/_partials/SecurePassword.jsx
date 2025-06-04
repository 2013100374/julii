import '@/public/css/secure-password.css';
import { useEffect, useState } from 'react';
import useUtility from '@/app/_hooks/useUtility';

export default function SecurePassword({password}) {
    const {trans} = useUtility();
    const [passwordConfig,setPasswordConfig] = useState({
        small: false,
        capital: false,
        number: false,
        special: false,
        minimum: false
    });

    useEffect(() => {
        var capital = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
        var capital = capital.test(password);
        if (capital) {
            setPasswordConfig(prevState => ({...prevState ,capital: true}));
        } else {
            setPasswordConfig(prevState => ({...prevState ,capital: false}));
        }

        var lower = /[abcdefghijklmnopqrstuvwxyz]/;
        var lower = password ? lower.test(password) : false;
        if (lower) {
            setPasswordConfig(prevState => ({...prevState ,small: true}));
        } else {
            setPasswordConfig(prevState => ({...prevState ,small: false}));
        }


        var number = /[1234567890]/;
        var number = number.test(password);
        if (number) {
            setPasswordConfig(prevState => ({...prevState ,number: true}));
        } else {
            setPasswordConfig(prevState => ({...prevState ,number: false}));
        }


        var special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var special = special.test(password);
        if (special) {
            setPasswordConfig(prevState => ({...prevState ,special: true}));
        } else {
            setPasswordConfig(prevState => ({...prevState ,special: false}));
        }


        var minimum = password?.length ?? 0;
        
        if (minimum < 6) {
            setPasswordConfig(prevState => ({...prevState ,minimum: false}));
        } else {
            setPasswordConfig(prevState => ({...prevState ,minimum: true}));
        }
    }, [password]); 
    
    return (
        <>
            <div className="input-popup">
                <p className={`${passwordConfig.small ? 'success' : 'error'} lower`}>{trans('1 small letter minimum')}</p>
                <p className={`${passwordConfig.capital ? 'success' : 'error'} capital`}>{trans('1 capital letter minimum')}</p>
                <p className={`${passwordConfig.number ? 'success' : 'error'} number`}>{trans('1 number minimum')}</p>
                <p className={`${passwordConfig.special ? 'success' : 'error'} special`}>{trans('1 special character minimum')}</p>
                <p className={`${passwordConfig.minimum ? 'success' : 'error'} minimum`}>{trans('6 character password')}</p>
            </div>
        </>
    )
}
