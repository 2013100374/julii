import Skeleton from "@/app/_partials/_skeletons/Skeleton";


export default function QuizBreadcrumbSkeleton() {
  return (
    <section className="quiz-breadcrumb">
      <div className="container">
        <div className="quiz-breadcrumb-back">
          <span className="icon">
            <Skeleton classes='dark'  width={20} height={20} />
          </span>
          <Skeleton classes='dark' width={50} height={20} />
        </div>

        <div className="quiz-breadcrumb__wrapper">
          <div className="quiz-breadcrumb__content">
            <h4 className="quiz-breadcrumb__title">
              <Skeleton classes='dark' width={300} height={50} />
            </h4>
            <p className="quiz-breadcrumb__desc">
              <Skeleton classes='dark' width={120} height={20} />
            </p>
          </div>

          <div className="quiz-date">
            <p className="quiz-date__title">
              <Skeleton classes='dark' width={60} height={16} />
            </p>
            <p className="quiz-date__time">
              <Skeleton classes='dark' width={100} height={16} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
