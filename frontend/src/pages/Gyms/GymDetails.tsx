import React, { useState } from "react";
import gymImg from "../../assets/images/gym1.jpg";
import starIcon from "../../assets/images/Star.png";
import GymAbout from "../../components/Gyms/GymAbout";
import Feedback from "../../components/Gyms/Feedback";
import SidePanel from "../../components/Gyms/SidePanel";

const GymDetails = () => {
  const [tab, setTab] = useState("about");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid lg:grid-cols-3 gap-[50px]">
          <div className="lg:col-span-2">
            <div className="flex items-center flex-col gap-10 sm:flex-row sm:items-start">
              <img
                src={gymImg}
                alt=""
                className="max-w-[300px] max-h-[400px] rounded-xl"
              />

              <div>
                <h3 className="text-headingColor text-[22px] leading-9 font-bold">
                  Peak Performance Gym
                </h3>

                <div className="flex items-center gap-[6px]">
                  <span
                    className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                  lg:leading:7 font-semiBold text-headingColor"
                  >
                    <img src={starIcon} alt="" /> 4.8
                  </span>

                  <span
                    className="text-[14px] leading-5 lg:text-[16px] lg:leading-7
                  font-[400] text-textColor"
                  >
                    (272)
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-headingColor text-[18px]">
                    Open Hours:
                  </h3>
                  <p className="mt-1 text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                    6:00 AM - 10:00 PM
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-headingColor text-[18px]">
                    Activities Available:
                  </h3>
                  <p className="mt-1 text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                    Gym | Crossfit | Boxing
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-headingColor text-[18px]">Address:</h3>
                  <p className="mt-1 text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                    Circular Road, Pathankot
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-[50px] border-b border-solid border-[##0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semiBold`}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semiBold`}
              >
                Feedback
              </button>
            </div>
            <div className="mt-[50px] ">
              {tab === "about" && <GymAbout />}
              {tab === "feedback" && <Feedback />}
            </div>
          </div>

          <div>
            <SidePanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymDetails;