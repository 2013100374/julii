import Input from '@/app/_forms/Input';
import SecurePassword from '@/app/_partials/SecurePassword';
import FormLabel from './FormLabel';
import { useState } from 'react';
import useUtility from '@/app/_hooks/useUtility';
import FormGroup from './FormGroup';

export default function PasswordField({passwordVal,setPasswordVal}) {
    const [showSecurePassword, setShowSecurePassword] = useState(false);
    const {gs} = useUtility();
    const securePassword = gs('secure_password');
    
    const handleShowSecurePassword = () => {
        if (securePassword) {
            setShowSecurePassword(true);
        }
    }
    
    const handleHideSecurePassword = () => {
        if (securePassword) {
            setShowSecurePassword(false);
        }
    }
    
    const handleInput = (e) => {
        setPasswordVal(e.target.value);
    }

    return (
        <>
            <FormGroup>
                <div className={`${showSecurePassword ? 'hover-input-popup' : ''}`}>
                    <FormLabel name={'password'} label={'Password'} required={true} />
                    
                    {securePassword ? <SecurePassword password={passwordVal} /> : null}

                    <Input 
                        name='password' 
                        type="password" 
                        autoComplete="off"
                        onFocus={handleShowSecurePassword} 
                        onBlur={handleHideSecurePassword} 
                        onInput={handleInput} 
                        required={true} 
                        errorHandler={true} 
                    />
                </div>
            </FormGroup>
        </>
    )
}
