import useUtility from '@/app/_hooks/useUtility'
import React, { useState } from 'react'

import LectureList from './LectureList';
import QuizesList from './QuizesList';
import { Image } from 'react-bootstrap';


export default function Syllabus({ course, enrolled }) {
    const { trans } = useUtility();
    const [showAll, setShowAll] = useState(false);
    const [accordionShow, setAccordionShow] = useState(null);

    const shouldShowAll = course?.sections?.length <= 3;
    const visibleSections = shouldShowAll || showAll ? course?.sections : course?.sections?.slice(0, 3);

    const toggleAccordion = (index) => {
        if (accordionShow === index) {
            setAccordionShow(0);
        } else {
            setAccordionShow(index);
        }
    }

    return (
        <>
            <section className="syllabus py-50">
                <div className="container">
                    <div className="syllabus-wrapper">
                        <div className="syllabus-header">
                            <div className="syllabus-header__wrapper">
                                <div className="syllabus-header__icon">
                                    <h2><i className="las la-clipboard-list"></i></h2>
                                </div>
                                <div className="syllabus-header__content">
                                    <h5 className="syllabus-header__title">{trans(`Syllabus`)}</h5>
                                    <ul className="syllabus-list">
                                        <li className="syllabus-list__item">{course?.sections?.length ?? 0} {trans(`Sections`)}</li>
                                        <li className="syllabus-list__item">
                                            {course?.sections?.reduce((total, section) =>
                                                total + (section?.curriculums?.reduce((sum, curriculum) => sum + (curriculum?.lectures?.length || 0), 0) || 0),
                                                0)} {trans(`Lectures`)}
                                        </li>
                                        <li className="syllabus-list__item">{course?.quizzes?.length ?? 0} {trans(`Quizzes`)}</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion module--accordion">
                            {visibleSections?.map((section, sectionIndex) => (
                                <div className="accordion-item" key={sectionIndex}>
                                    <h2 className="accordion-header">
                                        <button onClick={() => toggleAccordion(sectionIndex + 1)} className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target={`#section-${sectionIndex}`} aria-expanded="false">
                                            <span className="collapse-icon">
                                                {
                                                    accordionShow == sectionIndex + 1 ?
                                                        <i className="las la-caret-up"></i> :
                                                        <i className="las la-caret-down"></i>
                                                }
                                                {trans(section?.title)}
                                            </span>
                                            <span className="module-timeline">
                                                {section?.curriculums?.reduce((total, curriculum) => total + (curriculum?.lectures?.length || 0), 0)} {trans(`Lectures`)} • {section?.curriculums?.reduce((total, curriculum) => total + (curriculum?.quizzes?.length || 0), 0)} {trans(`Quizzes`)}
                                            </span>
                                        </button>
                                    </h2>
                                    <p className="module-desc-text">{section?.learning_object}</p>
                                    <div className='accordion-body p-0'>
                                        <div id={`section-${sectionIndex}`} className={`accordion-collapse collapse ${accordionShow == sectionIndex + 1 && 'show'}`} >
                                            {section?.curriculums?.map((curriculum, curriculumIndex) => (
                                                <div key={curriculumIndex} >
                                                    {curriculum?.lectures && curriculum?.lectures?.length > 0 && <LectureList curriculum={curriculum} course={course} enrolled={enrolled} />}

                                                    {curriculum?.quizzes && curriculum?.quizzes?.length > 0 && <QuizesList curriculum={curriculum} enrolled={enrolled} />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {!shouldShowAll && !showAll && (
                                <div className="accordion-show" onClick={() => setShowAll(true)}>
                                    <span className="accordion-show__text">
                                        {trans(`Show all`)} <span className="accordion-show__count">{course?.sections?.length}</span> {trans(`Sections`)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
