import React from "react";
import "./Styles.css";

const Rating = ({ val, text }) => {
  return (
    <div className="rating">
      <span>
        <i
          className={
            val >= 1
              ? "fas fa-star"
              : val >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            val >= 2
              ? "fas fa-star"
              : val >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            val >= 3
              ? "fas fa-star"
              : val >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            val >= 4
              ? "fas fa-star"
              : val >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          className={
            val >= 5
              ? "fas fa-star"
              : val >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span className="text">{text && text}</span>
    </div>
  );
};

export default Rating;
