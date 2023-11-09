import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { HashLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { buyMembership } from "../../features/slices/users/userMembershipsSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Dietician, Gym, Trainer } from "../../models";

const membershipDuration: { [key: string]: number } = {
  oneSession: 0,
  oneMonth: 1,
  sixMonth: 6,
  oneYear: 12,
};

interface Props{
  business: Gym|Trainer|Dietician|null;
  loading: boolean;
}

const MembershipPrice = ({business, loading}:Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("oneSession");
  const [membershipLoading, setMembershipLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to buy the membership?');
    if(!isConfirmed) return;
    setMembershipLoading(true);
    const startDate = new Date();
    const endDate = new Date();
    const months = membershipDuration[selectedOption];
    if (selectedOption === "oneSession") {
      endDate.setDate(startDate.getDate() + 1);
    } else {
      endDate.setMonth(startDate.getMonth() + months);
    }

    if (id && business) {
      const data = {
        id: id,
        startDate: startDate,
        endDate: endDate,
        role: business.role,
      };
      dispatch(buyMembership(data))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setMembershipLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setMembershipLoading(false);
        });
    }
  };

  return (
    <div className="shadow-2xl border border-solid border-gray-400 p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Membership Price</p>
      </div>
      {loading && <HashLoader />}
      {business?.membershipPrice ? (
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 py-2 border-y border-solid border-gray-400">
              <input
                type="radio"
                value="oneSession"
                checked={selectedOption === "oneSession"}
                onChange={handleOptionChange}
              />
              <div className="flex flex-1 justify-between">
                <p>1 Session</p>
                <p>₹ {business?.membershipPrice.oneSession}</p>
              </div>
            </div>

            <div className="flex gap-4 py-2 border-b border-solid border-gray-400">
              <input
                type="radio"
                value="oneMonth"
                checked={selectedOption === "oneMonth"}
                onChange={handleOptionChange}
              />
              <div className="flex flex-1 justify-between">
                <p>1 Month</p>
                <p>₹ {business?.membershipPrice.oneMonth}</p>
              </div>
            </div>

            <div className="flex gap-4 py-2 border-b border-solid border-gray-400">
              <input
                type="radio"
                value="sixMonth"
                checked={selectedOption === "sixMonth"}
                onChange={handleOptionChange}
              />
              <div className="flex flex-1 justify-between">
                <p>6 Months</p>
                <p>₹ {business?.membershipPrice.sixMonth}</p>
              </div>
            </div>

            <div className="flex gap-4 py-2 border-b border-solid border-gray-400">
              <input
                type="radio"
                value="oneYear"
                checked={selectedOption === "oneYear"}
                onChange={handleOptionChange}
              />
              <div className="flex flex-1 justify-between">
                <p>12 Months</p>
                <p>₹ {business?.membershipPrice.oneYear}</p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button type="submit" className="w-full h-[55px] bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
               {membershipLoading? <ClipLoader size={25} color="white"/>: "Buy Membership"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Not Available</div>
      )}
    </div>
  );
};

export default MembershipPrice;