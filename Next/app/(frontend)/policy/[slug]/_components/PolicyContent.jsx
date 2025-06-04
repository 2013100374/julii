"use client";

import useUtility from "@/app/_hooks/useUtility";
import Link from "next/link";


export default function PolicyContent({ policy }) {
    const { trans } = useUtility();
    return (
        <>
            <section className="py-50">
                <div className="privacy-page">
                    <h4>{trans(policy.title)}</h4>
                    <div dangerouslySetInnerHTML={{ __html: policy.details }} />
                </div>
            </section>
        </>
    )
}
