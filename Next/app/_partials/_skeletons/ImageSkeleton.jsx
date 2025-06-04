import Skeleton from "react-loading-skeleton";

export const ImageSkeleton = ({
    width = 100,
    height = 100,
    circle = false,
    full = false,
    ...rest
}) => {
    let _width = width;

    if (full) _width = '100%';

    return (
        <Skeleton
            width={_width}
            height={height}
            circle={circle}
            {...rest}
        />
    );
};