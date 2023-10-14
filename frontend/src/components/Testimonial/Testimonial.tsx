import React from "react";
// import { Pagination } from "swiper/modules";
import { EffectCards} from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-cards';
import testimonialImg from "../../assets/images/testimonial.jpeg";
import { HiStar } from "react-icons/hi";

const Testimonial = () => {
  return (
    <div className="mt-[30px] mx-[30px] lg:mt-[55px]">
      <Swiper
        modules={[EffectCards]}
        effect={'cards'}
        grabCursor={true}
      >
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center py-[30px] px-5 rounded-[13px]">
            <div className="flex items-center gap-[13px]">
              <div>
                <h4 className="text-[18px] leading-[30px] font-semiBold text-headingColor">
                  Manik Bhagat
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] text-center leading-7 mt-4 text-textColor font-[400]">
              "I never thought achieving my fitness goals could be this easy.
              HealthiVerse made it possible."
            </p>
            <img className="rounded-xl mt-[20px]" src={testimonialImg} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center py-[30px] px-5 rounded-[13px]">
            <div className="flex items-center gap-[13px]">
              <div>
                <h4 className="text-[18px] leading-[30px] font-semiBold text-headingColor">
                  Manik Bhagat
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] text-center leading-7 mt-4 text-textColor font-[400]">
              "I never thought achieving my fitness goals could be this easy.
              HealthiVerse made it possible."
            </p>
            <img className="rounded-xl mt-[20px]" src={testimonialImg} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center py-[30px] px-5 rounded-[13px]">
            <div className="flex items-center gap-[13px]">
              <div>
                <h4 className="text-[18px] leading-[30px] font-semiBold text-headingColor">
                  Manik Bhagat
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] text-center leading-7 mt-4 text-textColor font-[400]">
              "I never thought achieving my fitness goals could be this easy.
              HealthiVerse made it possible."
            </p>
            <img className="rounded-xl mt-[20px]" src={testimonialImg} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center py-[30px] px-5 rounded-[13px]">
            <div className="flex items-center gap-[13px]">
              <div>
                <h4 className="text-[18px] leading-[30px] font-semiBold text-headingColor">
                  Manik Bhagat
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] text-center leading-7 mt-4 text-textColor font-[400]">
              "I never thought achieving my fitness goals could be this easy.
              HealthiVerse made it possible."
            </p>
            <img className="rounded-xl mt-[20px]" src={testimonialImg} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
