"use client";

import Link from 'next/link';
import useLanguage from '../_hooks/useLanguage';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'next/image';
import useUtility from '../_hooks/useUtility';
import { useState } from 'react';

export default function LangControl() {
    const { changeLang, languages, selectedLanguage } = useLanguage();

    const { trans, gs } = useUtility();
    const [showDropdown, setShowDropdown] = useState(false);





    const handleSelect = (langCode) => {
        changeLang(langCode);
        setShowDropdown(false);
    };

    if(!gs('multi_language')){
        return null
    }

    return (

        
     
        <Dropdown className="lang-box lang-box-link" as="div" show={showDropdown} onToggle={setShowDropdown}>
            <Dropdown.Toggle className="lang-box-btn" as="button" id="dropdown-language-selector">
                <div className="thumb">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/language/${selectedLanguage?.image}`}
                        width={20}
                        height={20}
                        alt={selectedLanguage.name}
                    />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="lang-box-menu">
                {languages() && languages().map((lang) => (
                    <li className="lang-box-item" key={lang.code} data-code={lang.code} onClick={() => handleSelect(lang.code)}>
                        <Link href="#" className="lang-box-link">
                            <div className="thumb">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/language/${lang?.image}`}
                                    width={20}
                                    height={20}
                                    alt={lang.name}
                                />
                            </div>
                            <span className="text">{trans(lang.name)}</span>
                        </Link>
                    </li>
                ))}
            </Dropdown.Menu>
        </Dropdown>
        
    );
}
