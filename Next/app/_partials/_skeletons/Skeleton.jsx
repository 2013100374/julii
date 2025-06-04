import React from 'react';
import './SkeletonStyle.css';

const Skeleton = ({ classes,
    width = '100%',
    height = 20,
    baseColor,
    borderRadius = 0,
    count = 1,
    style 
}) => {

    if(typeof(width) != 'string'){
        width = `${width}px`;
    }

    if(typeof(height) != 'string'){
        height = `${height}px`;
    }

    const customStyle = {
        width: width,
        height: height,
        borderRadius: `${borderRadius}px`,
        ...style,
    };

    if (baseColor) {
        customStyle.backgroundColor = baseColor;
    }

    return(
        <>
            {Array.from({ length: count }).map((_, index) => (
                <span
                    key={index}
                    className={`skeleton ${classes ?? ''} ${count > 1 && index !== count - 1 ? 'mb-1' : ''}`}
                    style={customStyle}
                > 
                </span>
            ))}
        </>
    );
};

export default Skeleton;