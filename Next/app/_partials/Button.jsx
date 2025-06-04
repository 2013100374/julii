'use client'

import Image from "next/image";
import useUtility from "../_hooks/useUtility";

export function Button({ 
    icon,           
    label,          
    onClick,        
    className,      
    disabled = false, 
    iconPosition = "left", 
    fullWidth = false,  
    loading = false,  
    loadingText = null, 
    ...props         
}) {
    const { trans } = useUtility();
    
    return (
        <button 
            className={`btn ${fullWidth ? 'w-100' : ''} ${className}`} 
            onClick={onClick} 
            disabled={disabled || loading} 
            {...props}
        >
            {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
                icon && iconPosition === 'left' && (
                    <span className="me-2">
                        {typeof icon === 'string' 
                            ? <Image src={icon} alt="icon" width={18} height={18} />
                            : icon}
                    </span>
                )
            )}

            {loading ? null : trans(label)}

            {!loading && icon && iconPosition === 'right' && (
                <span className="ms-2">
                    {typeof icon === 'string' 
                        ? <Image src={icon} alt="icon" width={18} height={18} />
                        : icon}
                </span>
            )}
        </button>
    );
}
