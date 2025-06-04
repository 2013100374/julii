import { getMetaTitle } from "@/lib/helpers";
import ProfileForm from "./_components/ProfileForm";

export const metadata = getMetaTitle('Profile Data');

export default function ProfileData() {
    return (
        <>

            <ProfileForm />

        </>
    )
}
