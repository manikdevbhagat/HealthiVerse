import React from "react";

const Home = () => {
  return (
    <>
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/*hero section */}
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
              {/*hero counter*/}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
