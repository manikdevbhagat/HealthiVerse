import React from "react";

const GymAbout = () => {
  return (
    <div>
      <h3 className="text-[20px] font-[700] leading-[30px] text-headingColor font-semiBold flex is-center gap-2">
        Amenities
      </h3>
      <div className="mt-[25px]">
        <span
          className="bg-[#CCF0F3] text-irisBlueColor
                py-1 px-6 my-4 lg:py-2 lg:px-6 text-[12px] leading-4 
                lg:text-[16px] lg:leading-7 font-semiBold rounded"
        >
          Gym
        </span>
      </div>

      <h3 className="mt-[50px] text-[20px] font-[700] leading-[30px] text-headingColor font-semiBold flex is-center gap-2">
        About Peak Performance Gym
      </h3>
      <p className="text__para">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper
        nisl eu vestibulum tempus. Sed interdum libero facilisis interdum
        dictum. Curabitur maximus molestie nisi, sed facilisis nisl suscipit
        venenatis. Curabitur pharetra mi vel eros viverra, nec volutpat sem
        laoreet. Nulla molestie laoreet fermentum. Donec ullamcorper, ligula vel
        pharetra consequat, lorem neque cursus ipsum, in ultrices lacus neque
        sed nunc. Curabitur et nisl pharetra, tincidunt magna eget, euismod
        nisl. Aenean imperdiet, est ac cursus semper, dui arcu accumsan lorem,
        ut tristique odio massa ut ligula. Aenean ut risus a lectus pharetra
        blandit. Ut faucibus tellus ac purus eleifend dignissim. Mauris
        condimentum vestibulum tempus. Integer vehicula a nibh sit amet
        vehicula. Suspendisse condimentum lobortis sagittis. Aliquam malesuada
        mauris eu luctus mollis. Aenean tristique, risus tempus scelerisque
        malesuada, mauris lacus vulputate libero, quis placerat enim massa
        dignissim quam. Ut tincidunt ex in vulputate consequat.
      </p>
    </div>
  );
};

export default GymAbout;
