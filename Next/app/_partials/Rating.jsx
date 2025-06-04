import React from 'react';

export default function Rating({ rating }) {
  return (
    <ul className="rating__list" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <li key={starValue} className="rating__item">
            {rating >= starValue ? (
              <span className="rating__icon"><i className="las la-star"></i></span> 
            ) : rating >= starValue - 0.5 ? (
              <span className="rating__icon"><i className="las la-star-half-alt"></i></span> 
            ) : (
              <span className="rating__icon"><i className="lar la-star"></i></span> 
            )}
          </li>
        );
      })}
    </ul>
  );
}
