import { getLogo } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ mode = null, url='' }) => {
    
    return (
            <Link href="/" className="navbar-brand logo">
                <Image src={getLogo(mode)} width={275} height={48} alt="Logo" priority />
            </Link>
        
    );
}