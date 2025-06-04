import useUtility from '@/app/_hooks/useUtility';
import NextTopLoader from 'nextjs-toploader';

export default function TopLoader() {
    const {gs} = useUtility();
    return (
        <>
            <NextTopLoader color={`#${gs('base_color')}`} showSpinner={false} />
        </>
    )
}
