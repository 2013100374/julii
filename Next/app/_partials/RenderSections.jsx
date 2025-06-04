import dynamic from 'next/dynamic';

const sectionComponents = {
    'banner': dynamic(() => import('./_sections/Banner').then(mod => mod.Banner)),
    'earning': dynamic(() => import('./_sections/Earning').then(mod => mod.Earning)),
    'instructor': dynamic(() => import('./_sections/Instructor').then(mod => mod.Instructor)),
    'testimonial': dynamic(() => import('./_sections/Testimonial').then(mod => mod.Testimonial)),
    'counter': dynamic(() => import('./_sections/Counter').then(mod => mod.Counter)),
    'cta': dynamic(() => import('./_sections/Cta').then(mod => mod.Cta)),
    'blog': dynamic(() => import('./_sections/Blog').then(mod => mod.Blog)),
    'about_banner': dynamic(() => import('./_sections/AboutBanner').then(mod => mod.AboutBanner)),
    'categories': dynamic(() => import('./_sections/Categories').then(mod => mod.Categories)),
    'popular_courses': dynamic(() => import('./_sections/PopularCourses').then(mod => mod.PopularCourses)),
    'learners': dynamic(() => import('./_sections/Learners').then(mod => mod.Learners)),
    'top_courses': dynamic(() => import('./_sections/TopCourses').then(mod => mod.TopCourses)),
    'short_courses': dynamic(() => import('./_sections/ShortCourses').then(mod => mod.ShortCourses)),
    'career': dynamic(() => import('./_sections/Career').then(mod => mod.Career)),
    'about_content': dynamic(() => import('./_sections/AboutContent').then(mod => mod.AboutContent)),
    'achivment': dynamic(() => import('./_sections/Achievements').then(mod => mod.Achievements)),
    'location': dynamic(() => import('./_sections/Location').then(mod => mod.Location)),
    'teach_banner': dynamic(() => import('./_sections/TeachBanner').then(mod => mod.TeachBanner)),
    'teach_benifit': dynamic(() => import('./_sections/TeachBenefit').then(mod => mod.TeachBenefit)),
    'teach_counter': dynamic(() => import('./_sections/TeachCounter').then(mod => mod.TeachCounter)),
    'instructor_section': dynamic(() => import('./_sections/InstructorSection').then(mod => mod.InstructorSection)),
    'teach_community'      : dynamic(() => import('./_sections/TeachCommunity').then(mod => mod.TeachCommunity)),
    'become_instructor': dynamic(() => import('./_sections/BecomeInstructor').then(mod => mod.BecomeInstructor)),
    'teach_step': dynamic(() => import('./_sections/TeachStep').then(mod => mod.TeachStep)),
};

export const RenderSections = ({ page, sections = [] }) => {
    return (
        <>
            {sections?.map((section, index) => {
                const DynamicComponent = sectionComponents[section];
                return DynamicComponent ? <DynamicComponent key={index} section={section} /> : null;
            })}
        </>
    );
}
