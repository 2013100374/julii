import { NextResponse } from "next/server";
import { getCookie, hasCookie } from "cookies-next";

export async function middleware(req, res) {
    const { pathname } = req.nextUrl;

    const maintenanceModeCookie = getCookie('maintenance_mode', { req, res });
    const isLoggedIn = hasCookie('is_logged_in', { req, res });
    const isInstructorLoggedIn = hasCookie('is_logged_in_instructor', { req, res });

 
    if (pathname !== '/maintenance-mode' && maintenanceModeCookie) {
        return redirectTo('/maintenance-mode', req);
    }


    if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
        return redirectTo('/user/dashboard', req);
    }
    if (isInstructorLoggedIn && (pathname === '/instructor/login' || pathname === '/instructor/register')) {
        return redirectTo('/instructor/dashboard', req);
    }

 
    if (pathname.startsWith("/user") || pathname === '/authorization' || pathname === '/profile-data') {
        if (!isLoggedIn) return redirectTo('/login', req);
        let userStr = getCookie("user_data", { req, res });
        let user = userStr ? JSON.parse(userStr) : null;

        if (user) {
            if (user.profile_complete !== 1) {
                if (pathname.startsWith("/user")) return redirectTo('/profile-data', req);
            } else if (pathname === '/profile-data') {
                return redirectTo('/user/dashboard', req);
            }

            if (user.ev !== 1 || user.sv !== 1 || user.tv !== 1 || user.status === 0) {
                if (pathname.startsWith("/user")) return redirectTo('/authorization', req);
            } else if (pathname === '/authorization') {
                return redirectTo('/user/dashboard', req);
            }

         
        }
    }

    

    // Handle instructor redirects
    if (pathname.startsWith("/instructor") && pathname != '/instructor/reset-request-verify'  &&  pathname != '/instructor/password-reset-request' && pathname != '/instructor/password-reset' && pathname != '/instructor/validate') {
        const publicInstructorRoutes = ['/instructor/login', '/instructor/register'];
        if (!isInstructorLoggedIn) {
            if (!publicInstructorRoutes.includes(pathname)) {
                // Redirect only for protected routes
                return redirectTo('/instructor/login', req);
            }
        } else {
            let instructorStr = getCookie("instructor_data", { req, res });
            let instructor = instructorStr ? JSON.parse(instructorStr) : null;
    
            if (instructor) {
                if (instructor.profile_complete !== 1) {
                    return redirectTo('/instructor/profile-data', req);
                } else if (pathname === '/instructor/profile-data') {
                    return redirectTo('/instructor/dashboard', req);
                }
    
                if (instructor.ev !== 1 || instructor.sv !== 1 || instructor.tv !== 1 || instructor.status === 0) {
                    if (pathname.startsWith("/instructor")) return redirectTo('/instructor/authorization', req);
                } else if (pathname === '/instructor/authorization') {
                    return redirectTo('/instructor/dashboard', req);
                }
    
                if (pathname === '/instructor/withdraw' || pathname === '/instructor/withdraw/confirmation') {
                    if (instructor.kv !== 1) return redirectTo('/instructor/kyc-verification', req);
                } else if (pathname === '/instructor/kyc-verification') {
                    if (instructor.kv === 1) return redirectTo('/instructor/dashboard', req);
                }
            }
        }
    }
    

    return NextResponse.next();
}

function redirectTo(url, req) {
    let { basePath } = req.nextUrl;
    if (req.nextUrl.pathname === url) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL(basePath + url, req.url));
}

export const config = {
    matcher: [
        '/((?!api|static|icon*|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
