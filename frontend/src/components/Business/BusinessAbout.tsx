import { Dietician, Gym, Trainer } from "../../models";

interface Props{
  business: Gym|Trainer|Dietician|null;
}

const BusinessAbout = ({business}:Props) => {
  return (
    <div>
      <h3 className="text-[20px] font-[700] leading-[30px] text-headingColor font-semiBold flex is-center gap-2">
        Services
      </h3>
      <div className="mt-[25px] flex flex-wrap">
        {business?.services.map((service, index)=>(
          <span
          key={index}
          className="bg-purple-200 text-purple-600
                py-1 px-6 my-4 mx-2 lg:py-2 text-[14px] leading-4 
                lg:text-[16px] lg:leading-7 font-semibold rounded"
        >
          {service}
        </span>
        ))}
        
      </div>

      <h3 className="mt-[50px] text-[20px] font-[700] leading-[30px] text-headingColor font-semiBold flex is-center gap-2">
        About {business?.name}
      </h3>
      <p className="text__para">
        {business?.about}
      </p>
    </div>
  );
};

export default BusinessAbout;
