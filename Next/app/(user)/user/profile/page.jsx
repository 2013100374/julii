import ProfileForm from "./_components/ProfileForm";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Profile');

export default function Profile() {
    
    return (
        <>
            <div className="row justify-content-center">
                <ProfileForm />
            </div>
        </>
    )
}
