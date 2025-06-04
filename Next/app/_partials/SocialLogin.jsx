'use client'
import { signIn } from "next-auth/react";
import useUtility from "../_hooks/useUtility";
import { Image } from "react-bootstrap";
import googleIcon from "@/public/images/google.svg";
import facebookIcon from "@/public/images/facebook.svg";
import linkedinIcon from "@/public/images/linkedin.svg";

export default function SocialLogin({ socialCredentials }) {


    const { trans } = useUtility();
    return (
        <>
            <div className="social-auth">
                <div className="social-auth__title">{trans(`Or Log in using`)}</div>
                <ul className="social-auth__list">
                    {
                        socialCredentials?.google?.status === 1 &&
                        <li className="social-auth__item">
                            <button type="button" onClick={() => signIn('google')} className="social-auth__link">
                                <Image src={googleIcon.src} alt="social-img" />
                            </button>
                        </li>
                    }
                    {
                        socialCredentials?.facebook?.status === 1 &&
                        <li className="social-auth__item">
                            <button type="button" onClick={() => signIn('facebook')} className="social-auth__link">
                                <Image src={facebookIcon.src} alt="social-img" />
                            </button>
                        </li>
                    }
                    {
                        socialCredentials?.linkedin?.status === 1 &&

                        <li className="social-auth__item">
                            <button type="button" onClick={() => signIn('linkedin')} className="social-auth__link">
                                <Image src={linkedinIcon.src} alt="social-img" />
                            </button>
                        </li>

                    }
                </ul>
            </div>


        </>
    );
}
