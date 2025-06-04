"use client";

import Link from 'next/link';
import useLanguage from '../_hooks/useLanguage';
import Dropdown from './Dropdown';
import Image from 'next/image';
import useUtility from '../_hooks/useUtility';

export default function LangControl() {
    const {changeLang, languages, selectedLanguage} = useLanguage();
    const {trans} = useUtility();
    
    return (
        <>
            <Dropdown title={
                <>
                    <Image src={process.env.NEXT_PUBLIC_API_URL + '/assets/images/language/' + selectedLanguage?.image} width={20} height={20} alt={selectedLanguage?.name} /> {trans(selectedLanguage?.name)}
                </>
            }>
                {languages() && languages().map((lang) => (
                    <Link href='#' key={lang.code} className="dropdown-item" onClick={() => changeLang(lang.code)}>
                        <Image src={process.env.NEXT_PUBLIC_API_URL + '/assets/images/language/' + lang.image} width={20} height={20} alt={lang.name} /> {trans(lang.name)}
                    </Link>
                ))}
            </Dropdown>
        </>
    )
}
