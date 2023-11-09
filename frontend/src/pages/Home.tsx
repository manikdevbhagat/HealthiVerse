import React from "react";
import heroImg01 from "../assets/images/healthiverse1.jfif";
import { Link } from "react-router-dom";
import Testimonial from "../components/Testimonial/Testimonial";
import Services from "./Services";
import { CgGym } from "react-icons/cg";
import { FiUserCheck } from "react-icons/fi";
import { BiRun } from "react-icons/bi";

const Home = () => {
  return (
    <>
      {/*hero section start*/}
      <section className="hero__section pt-0 pb-6">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-start justify-between">
            {/*hero content */}
            <div className="pt-[60px]">
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  Discover Your Path to a Healthier You.
                </h1>
                <p className="text__para">
                  Your One-Stop Platform for Fitness and Nutrition.
                </p>
              </div>
              {/*hero numbers*/}
              <div className="mt-[30px] lg:mt-[70px] flex flex-row items-start gap-6 lg:gap-[30px]">
                <div className="flex flex-col items-center justify-start">
                  <div className="flex items-center h-[60px] w-[60px] mb-3 justify-center rounded-full bg-blue-500 ">
                    <CgGym
                      style={{ height: "45px", width: "45px", color: "white" }}
                    />
                  </div>
                  <h6 className="text-2xl sm:text-4xl font-bold text-deep-purple-accent-400">
                    10k+
                  </h6>
                  <p className="mb-2 text-center font-bold text-md">
                    Fitness Locations
                  </p>
                </div>
                <div className="flex flex-col items-center justify-start">
                  <div className="flex items-center h-[60px] w-[60px] mb-3 justify-center rounded-full bg-yellow-400 ">
                    <BiRun
                      style={{ height: "45px", width: "45px", color: "white" }}
                    />
                  </div>
                  <h6 className="text-2xl sm:text-4xl  font-bold text-deep-purple-accent-400">
                    1K+
                  </h6>
                  <p className="mb-2 text-center font-bold text-md">Coaches</p>
                </div>
                <div className="flex flex-col items-center justify-start">
                  <div className="flex items-center h-[60px] w-[60px] mb-3 justify-center rounded-full bg-green-500 ">
                    <FiUserCheck
                      style={{ height: "35px", width: "35px", color: "white" }}
                    />
                  </div>
                  <h6 className="text-2xl sm:text-4xl  font-bold text-deep-purple-accent-400">
                    100%
                  </h6>
                  <p className="mb-2 text-center font-bold text-md">
                    Client Satisfaction
                  </p>
                </div>
              </div>
              <Link to="/services">
                <button className="py-4 px-4 mt-8 bg-primaryColor hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full ">
                  Get Started Now
                </button>
              </Link>
            </div>

            <div className="hidden lg:flex gap-[30px] justify-end">
              <div>
                <img
                  className="hidden lg:block w-full h-max-[800px] h-auto rounded-xl"
                  src={heroImg01}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*hero section end*/}

      {/*how it works section*/}
      <Services />
      {/*how it works section end*/}

      {/*testimonials section */}
      <section className="bg-gray-100">
        <div className="container md:max-w-[550px] flex flex-col items-center overflow-hidden">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Client Testimonials</h2>
            <p className="text__para text-center">
              Here's what some of our happy clients have to say:
            </p>
          </div>
          <Testimonial />
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
            <Link to="/contact">
              <button className="btn">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>
      {/*contact us section end*/}
    </>
  );
};

export default Home;