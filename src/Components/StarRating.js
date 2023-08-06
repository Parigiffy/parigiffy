import React, { memo } from "react";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = memo(({ value, size, color, ...rest }) => {
  return (
    <Rating
      style={{
        color: color || "gold",
      }}
      emptySymbol={<AiOutlineStar size={23} />}
      fullSymbol={<AiFillStar size={23} />}
      initialRating={value}
      {...rest}
    />
  );
});

export default StarRating;
