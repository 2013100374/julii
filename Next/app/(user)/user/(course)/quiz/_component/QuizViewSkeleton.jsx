import Skeleton from "@/app/_partials/_skeletons/Skeleton";


export default function QuizViewSkeleton() {
  return (
    <section className="quiz-view py-100">
      <div className="container">
        <div className="quiz-board bg-img">
          <div className="quiz-board__wrapper">
            <div className="quiz-board__icon">
              <Skeleton classes="dark" circle width={80} height={80} />
            </div>
            <div className="quiz-board__content">
              <div className="quiz-board-header">
                <div className="quiz-board-header__left">
                  <h4 className="quiz-board-header__heading">
                    <Skeleton classes="dark" width={100} height={24} />
                  </h4>
                  <h4 className="quiz-board-header__title">
                    <Skeleton classes="dark" width={200} height={24} />
                  </h4>
                </div>

                <div className="quiz-date">
                  <p className="quiz-date__title">
                    <Skeleton classes="dark" width={80} height={16} />
                  </p>
                  <p className="quiz-date__time">
                    <Skeleton classes="dark" width={120} height={16} />
                  </p>
                </div>
              </div>

              <div className="quiz-result">
                <div className="quiz-result__info">
                  <p className="quiz-result__title">
                    <Skeleton classes="dark" width={150} height={20} />
                  </p>
                  <p className="quiz-result__desc">
                    <Skeleton classes="dark" width={220} height={20} />
                  </p>
                </div>

                <div className="quiz-grade">
                  <p className="quiz-grade__title">
                    <Skeleton classes="dark" width={100} height={20} />
                  </p>
                  <p className="quiz-grade__mark">
                    <Skeleton classes="dark" width={180} height={20} />
                  </p>
                </div>
              </div>

              <div className="quiz-board__button">
                <Skeleton classes="dark" width={150} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
