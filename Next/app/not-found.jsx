import Image from "next/image";
import Link from "next/link";
import NotFoundImage from '@/public/images/404.png'

export default function NotFound() {
    return (
        <div className="notfound-page">
            <div className="container">
                <div className="notfound-page-thumb pb-50">
                    <Image
                        className="fit-image"
                        src={NotFoundImage}
                        alt="not-found"
                    />
                </div>
                <h3 className="notfound-page-title">Page Not Found</h3>
                <p className="notfound-page-message pb-50">
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link href="/" className="btn btn--base">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
