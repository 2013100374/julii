import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { frontendImage } from '@/lib/helpers';
import { Image } from 'react-bootstrap';

export const TeachCommunity = ({section}) => {
      const { content, elements } = useSection(section);
        const { trans } = useUtility();
    
    return (
        <section className="teach-community py-50">
            <div className="container">
                <div className="teach-community__wrapper">
                    <div className="teach-community__thumb">
                        <Image src={frontendImage(content?.data_values?.image, 'teach_community')} alt="images" />
                    </div>
                    <div className="teach-community__content">
                        <h2 className="teach-community__title">{trans(content?.data_values?.heading)}</h2>
                        <p className="teach-community__desc"  dangerouslySetInnerHTML={{
                                        __html:content?.data_values?.description
                                    }}>
                        </p>
                    </div>
                    <div className="teach-community__thumb">
                        <Image src={frontendImage(content?.data_values?.image_two, 'teach_community')}  alt="images" />
                    </div>
                </div>
            </div>
        </section>

    )
}
