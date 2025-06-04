"use client";
import '@/public/css/verification-code.css';
import Input from '@/app/_forms/Input';
import useUtility from '@/app/_hooks/useUtility';

export default function CodeVerification({ verCode, setVerCode, onCodePaste }) {
    const { trans } = useUtility();

    const handleCodeInput = (e) => {
        let codeValue = e.target.value;
        if (codeValue.length > 6) {
            return;
        }
        setVerCode(codeValue);
    };

    const handlePaste = (e) => {
        e.preventDefault(); 
        const pastedCode = e.clipboardData.getData('text').trim();

        if (pastedCode.length === 6 && /^[0-9]+$/.test(pastedCode)) {  
            setVerCode(pastedCode);
            if (onCodePaste) {
                onCodePaste(pastedCode); 
            }
        }
    };

    return (
        <div className="mb-3">
            <label className="form-label">{trans('Verification Code')}</label>
            <div className="verification-code">
                <Input
                    name="code"
                    id="verification-code"
                    value={verCode}
                    onChange={handleCodeInput}
                    onPaste={handlePaste} 
                    className="form-control"
                />
                <div className="boxes">
                    {[...Array(6)].map((_, i) => (
                        <span key={i}>{verCode[i] || '-'}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
