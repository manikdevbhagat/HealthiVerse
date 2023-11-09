
import { Dietician, Gym, Trainer } from "../../models";
import { HiStar } from "react-icons/hi";
import { FaMapLocationDot } from "react-icons/fa6";

interface Props {
  business: Gym | Trainer | Dietician;
}

const BusinessCard = ({ business }: Props) => {
  const displayServices = (services: string[]) => {
    if (services.length <= 2) {
      return services.map((service, index) => (
        <span key={index}>
          {index === 0 ? "" : " | "}
          {service}{" "}
        </span>
      ));
    } else {
      let twoServices = [services[0], services[1]];
      return (
        <>
          {twoServices.map((service, index) => (
            <span key={index}>{service + " | "}</span>
          ))}
          <span>+{services.length - 2} more</span>
        </>
      );
    }
  };
  return (
    <div className=" w-[300px] md:w-[350px] flex flex-col mb-6">
      <div>
        <img
          className="w-[300px] md:w-[350px] h-[250px] object-cover rounded-t-xl"
          src={business.photo}
          alt=""
        />
      </div>
      <div className="shadow-xl p-4 rounded-b-xl">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold max-w-[320px] truncate">
          {business.name}
        </h3>
        {/* <h1 className="max-w-[350px] truncate text-[20px] text-textColor font-[700]">
          {business.name}
        </h1> */}
        <div className="flex">
          <HiStar className="text-yellowColor w-[18px] h-5" />
          <span className="ml-1 text-textColor font-[700]">
            {business.avgRating.toFixed(1)}
          </span>
          <span className="ml-1 text-textColor">({business.totalRating})</span>
        </div>
        <div className="text-gray-600">
          {displayServices(business.services)}
        </div>
        {"address" in business && (
          <div className="flex items-center gap-3 mt-2">
            <FaMapLocationDot />
            <p className="w-full truncate">{business.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;