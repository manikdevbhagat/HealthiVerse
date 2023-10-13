import React from "react";
import heroImg01 from "../assets/images/gym1.jpg";
import heroImg02 from "../assets/images/gym3.jpg";
import heroImg03 from "../assets/images/dietician2.jpg";
import gymImg from "../assets/images/gym1.jpg";
import trainerImg from "../assets/images/trainer1.jpg";
import dieticianImg from "../assets/images/dietician1.jpg";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      {/*hero section start*/}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-start justify-between">
            {/*hero content */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  Discover Your Path to a Healthier You.
                </h1>
                <p className="text__para">
                  Your One-Stop Platform for Fitness and Nutrition.
                </p>
                <button className="btn">Get Started Now</button>
              </div>
              {/*hero numbers*/}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[600] text-headingColor">
                    10k+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]" />
                  <p className="text__para">Fitness Locations</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[600] text-headingColor">
                    1k+
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]" />
                  <p className="text__para">Coaches</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[600] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-greenColor rounded-full block mt-[-14px]" />
                  <p className="text__para">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex gap-[30px] justify-end">
              <div>
                <img
                  className="hidden lg:block w-full h-auto max-h-[600px] rounded-xl"
                  src={heroImg01}
                  alt=""
                />
              </div>
              <div className="lg:mt-[30px]">
                <img
                  className="hidden lg:block w-full h-auto max-h-[300px] rounded-xl mb-[30px]"
                  src={heroImg02}
                  alt=""
                />
                <img
                  className="hidden lg:block w-full h-auto max-h-[300px] rounded-xl mb-[30px]"
                  src={heroImg03}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*hero section end*/}

      {/*how it works section*/}
      <section>
        <div className="container">
          <div className="lg:w-[650px] mx-auto">
            <h2 className="heading text-center">How HealthiVerse helps you</h2>
            <p className="text__para text-center">
              At HealthiVerse, we're passionate about helping you achieve your
              health and fitness goals. Our platform seamlessly connects you
              with a world of fitness options, from top-rated gyms to certified
              personal trainers and registered dieticians.
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 
          gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]"
          >
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img
                  className="w-full h-[400px] max-w-[350px] rounded-xl"
                  src={gymImg}
                  alt=""
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Gym
                </h2>
                <Link
                  to="/gyms"
                  className="w-[44px] h-[44px] rounded-full border border-solid 
                border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img
                  className="w-full h-[400px] max-w-[350px] rounded-xl"
                  src={trainerImg}
                  alt=""
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Trainer
                </h2>
                <Link
                  to="/trainers"
                  className="w-[44px] h-[44px] rounded-full border border-solid 
                border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img
                  className="w-full h-[400px] max-w-[350px] rounded-xl"
                  src={dieticianImg}
                  alt=""
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Dietician
                </h2>
                <Link
                  to="/dieticians"
                  className="w-[44px] h-[44px] rounded-full border border-solid 
                border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*how it works section end*/}

      {/*testimonials section */}
      <section className="testimonial__section">
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Client Testimonials</h2>
            <p className="text__para text-center">
              Here's what some of our happy clients have to say
            </p>
          </div>
          <Testimonial/>
        </div>
        
      </section>
      {/*testimonials section end*/}

      {/*contact us section*/}
      <section>
        <div className="container">
          <div className="lg:w-[650px] mx-auto flex flex-col items-center justify-center">
            <h2 className="heading text-center">Still have questions?</h2>
            <p className="text__para text-center">
            Please help us understand your doubts and we’ll get back to you
            </p>
            <button className="btn">Contact Us</button>
          </div>
        </div>
      </section>
      {/*contact us section end*/}
    </>
  );
};

export default Home;
