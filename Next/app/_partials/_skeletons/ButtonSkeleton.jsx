import Skeleton from "react-loading-skeleton";

export const ButtonSkeleton = ({
    ...rest
}) => {
    return (
        <Skeleton height={50} width={150} {...rest} />
    );
};