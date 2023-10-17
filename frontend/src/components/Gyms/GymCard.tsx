import React from "react";
import { Gym } from "../../models";
import { HiStar } from "react-icons/hi";
import { FaMapLocationDot } from "react-icons/fa6";

interface Props {
  gym: Gym;
}
const GymCard = ({ gym }: Props) => {
  const displayServices = (services: string[]) => {
    if (services.length <= 2) {
      return services.map((service, index) => (
        <span>
          {index === 0 ? "" : " | "}
          {service}{" "}
        </span>
      ));
    } else {
      let twoServices = [services[0], services[1]];
      return (
        <>
          {twoServices.map((service) => (
            <span>{service + " | "}</span>
          ))}
          <span>+{services.length - 2} more</span>
        </>
      );
    }
  };
  return (
    <div className="flex flex-col mb-6">
      <div>
        <img
          className=" w-[350px] h-[250px] object-cover rounded-t-xl"
          src={gym.photo}
          alt=""
        />
      </div>
      <div className="shadow-xl p-4 rounded-b-xl">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold max-w-[320px] truncate">
          {gym.name}
        </h3>
        {/* <h1 className="max-w-[350px] truncate text-[20px] text-textColor font-[700]">
          {gym.name}
        </h1> */}
        <div className="flex">
          <HiStar className="text-yellowColor w-[18px] h-5" />
          <span className="ml-1 text-textColor font-[700]">
            {gym.avgRating}
          </span>
          <span className="ml-1 text-textColor">({gym.totalRating})</span>
        </div>
        <div className="text-gray-600">{displayServices(gym.services)}</div>
        <div className="flex items-center gap-3 mt-2">
          <FaMapLocationDot />
          <p className="max-w-[290px] truncate">{gym.address}</p>
        </div>
      </div>
    </div>
  );
};

export default GymCard;
