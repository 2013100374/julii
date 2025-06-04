import { store } from "@/store";
import { deleteCookie, getCookie } from "cookies-next";
import ENDPOINTS from "./endpoints";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import axios from "axios";
import toast from "react-hot-toast";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { cache } from "react";
import avatar from '@/public/images/avatar.jpg';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

export const getFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else {
            formData.append(key, value);
        }
    });
    return formData;
}

export const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

request.interceptors.request.use(
    async (config) => {
        const token = getCookie('access-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const fingerprint = await getFingerPrint();
        if (fingerprint) {
            config.headers['X-Fingerprint'] = fingerprint;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// request.interceptors.response.use(
//     (response) => {
//         if (response?.data?.remark == 'unauthenticated') {
//             deleteCookie('is_logged_in');
//             deleteCookie('user_data');
//             window.location.href = '/login';
//         }

//         return response;
//     },
//     (error) => {
//         if (error.response) {
//             const { status } = error.response;

//             if (status === 403) {
//                 deleteCookie('is_logged_in');
//                 deleteCookie('access-token');
//                 deleteCookie('user_data');

//                 window.location.href = '/login';
//             }
//         }

//         return Promise.reject(error);
//     }
// );


export const getMetaTitle = (title) => {
    return {
        title: getTitle(title),
        openGraph: {
            title: getTitle(title),
        }
    }
}

export const getTitle = (title = null) => {
    return title ? `${process.env.NEXT_PUBLIC_SITE_TITLE} - ${title}` : process.env.NEXT_PUBLIC_SITE_TITLE;
}

export const getCustomCaptcha = () => {
    return store.getState()?.captcha?.customCaptcha?.data;
}

export const getGoogleCaptcha = () => {
    return store?.getState()?.state?.captcha?.googleCaptcha?.data;
}

export const showEmailAddress = (email) => {
    return email.substring(0, 1) + '***' + email.substring((email.indexOf('@') - 1) + 1);
}

export function showMobileNumber(number) {
    return number.substring(0, 2) + '***' + number.substring(number.length - 2);
}

export const getUser = () => JSON.parse(getCookie("user_data") || "null");

export const getInstructor = () => JSON.parse(getCookie("instructor_data") || "null");





export const getCountries = async () => {
    try {
        return (await request.get(ENDPOINTS.COUNTRIES)).data;
    } catch (error) {
        return [];
    }
}

export const getCourseDetails = async (slug) => {


    try {
        return (await request.get(ENDPOINTS.COURSE_DETAILS + '/' + slug)).data.data.course;

    } catch (error) {
        return [];
    }
}





export const getCategories = async () => {
    try {
        return (await request.get(ENDPOINTS.CATEGORIES)).data.data.categories;
    } catch (error) {
        return [];
    }
}


export function showDateTime(date, format = 'YYYY-MM-DD hh:mm A') {
    if (!date) {
        return '-';
    }

    const lang = getCookie('lang') || getDefaultLang();

    dayjs.tz.setDefault('UTC');
    dayjs.locale(lang);
    return dayjs(date).format(format);
}

function getDefaultLang() {
    return 'en';
}

export function diffForHumans(date) {
    if (!date) {
        return '-';
    }

    const lang = getCookie('lang') || getDefaultLang();

    dayjs.locale(lang);
    return dayjs(date).fromNow();
}

export function keyToTitle(text) {
    return text
        .replace(/[^A-Za-z0-9 ]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

export function titleToKey(text) {
    return text.toLowerCase().replace(/ /g, '_');
}

export function getLastSegment(str) {
    if (!str) {
        return null;
    }

    const segments = str.split('.');
    return segments[segments.length - 1];
}

export function getLogo(mode) {
    if (mode === 'dark') {
        return getImage() + 'logo_icon/logo_dark.png';
    } else {
        return getImage() + 'logo_icon/logo.png';
    }
}

export const getSEO = async ({
    description = null,
    image = null,
    keywords = null,
    title = null,
    url = null
} = {}) => {




    const globalSeo = await fetch(process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.SEO, {
        next: { revalidate: 300 }
    }).then((res) => res.json());
    const seoContents = globalSeo?.data?.seo_content?.data_values;
    return {
        title: title || getTitle('Home'),
        description: description || seoContents?.description,
        keywords: keywords || seoContents?.keywords,
        openGraph: {
            title: title || getTitle('Home'),
            description: description || seoContents?.description,
            type: 'website',
            url: url || process.env.NEXT_PUBLIC_API_URL,
            images: [
                image ? image : getImage() + 'seo/' + seoContents?.image
            ]
        }
    };
}


export const slug = (string) => {
    return string.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$|--+/g, '');
}

export const customPageData = cache(async (slug) => {
    const getCustomPage = async (slug) => {
        const { data } = await request.get(`${ENDPOINTS.CUSTOM_PAGE}/${slug}`);

        return data;
    }
    return await getCustomPage(slug);
});

export const notifyToast = (data) => {
    const status = data?.status || 'error';

    if (Array.isArray(data?.message)) {
        data?.message?.map(m => toast[status](m));
    } else {
        data?.message?.[status]?.map(m => {
            toast[status](m)[0]
        });
    }
}

export const toBase64 = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
}

export const fromBase64 = (str) => {
    return decodeURIComponent(escape(atob(str)));
}

export function generateScript(script, shortcode) {
    let generatedScript = script;
    for (const [key, item] of Object.entries(shortcode)) {
        generatedScript = generatedScript.replace(new RegExp(`{{${key}}}`, 'g'), item.value);
    }
    return generatedScript;
}

/** Get image from backend url /assets/images/* */
export function getImage() {
    return `${process.env.NEXT_PUBLIC_API_URL}/assets/images/`;
}

export function getCourseImage(coursePath, courseImage) {
    if (courseImage) {
        return `${coursePath}/thumb_${courseImage}`;
    }


    return `${process.env.NEXT_PUBLIC_API_URL}/assets/images/default.png`;
}



export function getProfileImage(path, image) {
    if (image) {
        return `${path}/${image}`;
    }

    return avatar.src;
}

/**
 * This helper function helps you to get an image for a section or from the /frontend directory
 */
export const frontendImage = (src, section = '') => {
    return `${getImage()}frontend/${section ? `${section}/` : ''}${src}`;
}

export function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} Bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const getFingerPrint = async () => {
    if (typeof window == 'undefined') return null;

    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
}


export function sitePrefix() {
    return (process.env.NEXT_PUBLIC_AUTH_PREFIX == '/' || !process.env.NEXT_PUBLIC_AUTH_PREFIX) ? '' : process.env.NEXT_PUBLIC_AUTH_PREFIX;
}


export const strLimit = (text, length) => text.length > length ? text.substring(0, length) + "..." : text;

