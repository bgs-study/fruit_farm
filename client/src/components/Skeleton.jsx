import "../styles/skeleton.css";

const SkeletonElement = ({ type }) => {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
};

export const SkeletonList = () => {
    return (
      <div className="skeleton-wrapper">
        <div className="skeleton-list">
            <div className="skeleton-inner">
                <SkeletonElement type="img-wrap" />
                <div className="skeleton-content-inner">
                    <SkeletonElement type="review-farm-title" />
                    <SkeletonElement type="review-content" />
                    <SkeletonElement type="review-content" />
                    <SkeletonElement type="review-content" />
                    <SkeletonElement type="review-content" />
                </div>
            </div>
            <div className="skeleton-button-wrap">
                <SkeletonElement type="confirm-button" />
                <SkeletonElement type="confirm-button" />
            </div>
        </div>
      </div>
    );
};

export const SkeletonReviewReservation = () => {
    return (
      <div className="skeleton-wrapper">
        <div className="skeleton-reservation-wrap">
            <div className="skeleton-review-inner">
              <SkeletonElement type="big-img-wrap" /> 
            </div>
            <div className="skeleton-content-inner">
                <SkeletonElement type="review-form-farm-title" />
                <SkeletonElement type="review-content" />
                <SkeletonElement type="review-content" />
                <SkeletonElement type="review-content" />
            </div>
        </div>
    </div>
    );
};
