import { getMetaTitle } from "@/lib/helpers";
import LoginForm from "./_components/LoginForm";

export const metadata = getMetaTitle('Login');

export default function Login() {
    return (
        <>

            <LoginForm />

        </>
    )
}
