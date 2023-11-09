import gymImg from "../assets/images/gym1_900.jpg";
import trainerImg from "../assets/images/trainer1_900.jpg";
import dieticianImg from "../assets/images/dietician1.jpg";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Services = () => {
  return (
    <section>
      <div className="container">
        <div className="lg:w-[650px] mx-auto">
          <h2 className="heading text-center">How HealthiVerse helps you</h2>
          <p className="text__para text-center">
            At HealthiVerse, we're passionate about helping you achieve your
            health and fitness goals. Our platform seamlessly connects you with
            a world of fitness options, from top-rated gyms to certified
            personal trainers and registered dieticians.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 
      gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]"
        >
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <Link
                to="/gyms"
                className=" hover:shadow-xl cursor-pointer w-full h-[400px] max-w-[350px]"
              >
                <img
                  className="w-full h-[400px] max-w-[350px] rounded-xl"
                  src={gymImg}
                  alt=""
                />
              </Link>
            </div>
            <div className="mt-[30px] flex items-center justify-center gap-10">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Find a Gym
              </h2>
              <Link
                to="/gyms"
                className="w-[44px] h-[44px] rounded-full border border-solid 
            border-black flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <Link
                to="/trainers"
                className=" hover:shadow-xl cursor-pointer w-full h-[400px] max-w-[350px]"
              >
                <img
                  className="w-full h-[400px] max-w-[350px] rounded-xl"
                  src={trainerImg}
                  alt=""
                />
              </Link>
            </div>
            <div className="mt-[30px] flex items-center justify-center gap-10">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Find a Trainer
              </h2>
              <Link
                to="/trainers"
                className="w-[44px] h-[44px] rounded-full border border-solid 
            border-black flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>
          <div className="py-[30px] px-5">
            <div className="flex items-center justify-center">
              <Link
                to="/dieticians"
                className=" hover:shadow-xl cursor-pointer w-full h-[400px] max-w-[350px]"
              >
                <img
                  className="w-full h-[400px] max-w-[350px] rounded-xl"
                  src={dieticianImg}
                  alt=""
                />
              </Link>
            </div>
            <div className="mt-[30px] flex items-center justify-center gap-10">
              <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                Find a Dietician
              </h2>
              <Link
                to="/dieticians"
                className="w-[44px] h-[44px] rounded-full border border-solid 
            border-black flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;