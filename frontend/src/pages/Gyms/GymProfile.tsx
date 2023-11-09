import React from "react";
import GymAccount from "../../components/Dashboard/gyms/GymAccount";
import GymUpdateForm from "../../components/Dashboard/gyms/GymUpdateForm";

const GymProfile = () => {
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <GymAccount/>
          <div className="md:col-span-2 md:px-[30px]">
            <GymUpdateForm/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymProfile;
