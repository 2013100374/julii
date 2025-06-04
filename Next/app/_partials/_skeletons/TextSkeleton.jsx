import Skeleton from "react-loading-skeleton";

export const TextSkeleton = ({
    subheader = false,
    header = false,
    line = 1,
    linHeight = 1,
    simulateText = false,
    ...rest
}) => {
    const getRandomWidth = (min, max) => `${Math.random() * (max - min) + min}%`;

    const renderSkeleton = (height, width, marginBottom, key = null) => {
        return (
            <Skeleton
                key={key}
                height={height}
                width={width}
                style={{ marginBottom }}
                {...rest}
            />
        );
    };

    if (subheader) {
        return renderSkeleton(24, getRandomWidth(50, 100), '12px');
    }

    if (header) {
        return renderSkeleton(36, getRandomWidth(30, 100), '16px');
    }

    if (simulateText) {
        return (
            <>
                {Array.from({ length: line }).map((_, i) =>
                    renderSkeleton(
                        10,
                        i === line - 1 ? getRandomWidth(30, 100) : '100%',
                        '8px',
                        i
                    )
                )}
            </>
        );
    }

    return <Skeleton height={10} count={line} {...rest} />;
};
