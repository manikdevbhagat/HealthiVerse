import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import { Dietician, Gym, Trainer } from "../../models";

interface Props{
  business: Gym|Trainer|Dietician|null;
}

const Feedback = ({business}:Props) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  // const { gym } = useAppSelector((state) => state.singleGym);

  return (
    <div>
      <div className="mb-[50px]">
        <h4
          className="text-[20px] leading-[30px] font-bold text-headingColor
        mb-[30px] "
        >
          All reviews ({business?.totalRating})
        </h4>
        {business?.reviews.map((review, index) => (
          <div key={index} className="flex justify-between gap-4 mb-[30px] border-gray-300 border-b pb-4">
            <div className="flex gap-3">
              <figure className="block w-10 h-10">
                <img src={review.client.photo} alt="" className="min-w-[40px] h-full rounded-full" />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review.client.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {formatDate(review.updatedAt.toString())}
                </p>
                <p className="text__para font-medium text-[15px]">
                  {review.reviewText}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: review.rating }).map((index) => (
                <AiFillStar key={index} className="text-yellowColor" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button onClick={() => setShowFeedbackForm(true)} className="btn">
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && (
        <>
          <FeedbackForm business={business}/>
        </>
      )}
    </div>
  );
};

export default Feedback;