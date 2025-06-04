import Skeleton from "react-loading-skeleton";
import classes from './HeaderSkeleton.module.css';

export const HeaderSkeleton = ({
    hasCloseButton = false
}) => {
    return (
        <div className={classes.headerSkeleton}>
            <div className={classes.leftPart}>
                <Skeleton borderRadius={10} height={30} />
                <Skeleton borderRadius={10} height={30} />
            </div>

            <div className={classes.rightPart}>
                {hasCloseButton ? <Skeleton borderRadius={10} height={30} /> : null}
            </div>
        </div>
    );
};