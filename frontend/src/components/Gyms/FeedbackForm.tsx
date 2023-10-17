import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <form>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          How would you rate your experience?
        </h3>
        <div>
          {Array.from({ length: 5 }).map((_, index) => {
            index++;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setRating(0);
                  setHover(0);
                }}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          Share your feedback or suggestions{" "}
          <span className="text-red-600">*</span>
        </h3>
        <textarea
          className="border border-solid border-blue-800 focus-outline 
        outline-primaryColor w-full px-4 py-3 rounded-md"
          rows={5}
          placeholder="Write your feedback"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button className="btn" onClick={handleSubmitReview}>
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
