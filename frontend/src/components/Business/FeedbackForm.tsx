import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dietician, Gym, Trainer } from "../../models";
import reviewService from "../../features/services/review/reviewService";

interface Props {
  business: Gym | Trainer | Dietician | null;
}

const FeedbackForm = ({ business }: Props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { id } = useParams();

  const handleSubmitReview = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if(!rating||!reviewText){
      window.alert("Please fill the required fields");
      return;
    }
    if (id && business) {
      const data = {
        id: id,
        rating: rating,
        reviewText: reviewText,
        businessRole: business.role,
      };
      const res = await reviewService.addReview(data);
      if (res) {
        const { success, message } = res;
        if (success) {
          console.log(message);
          toast.success(message);
          window.location.reload();
        } else {
          console.log(message);
          toast.error(message);
        }
      }
    }
  };

  return (
    <form>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          How would you rate your experience? <span className="text-red-600">*</span>
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
          required
        ></textarea>
      </div>
      <button className="btn" onClick={handleSubmitReview}>
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;