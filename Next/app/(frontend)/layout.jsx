"use client";
import { useSelector } from "react-redux";
import Footer from "../_partials/Footer";
import Navbar from "../_partials/_navbar/Navbar";

export default function RootLayout({ children }) {
    const gsRemark = useSelector((state) => state.gs.data?.remark);

    return (
        <>
            {gsRemark === "maintenance_mode" ? (
                children
            ) : (
                <>
                    <Navbar />
                    {children}
                    <Footer />
                </>
            )}
        </>
    );
}
