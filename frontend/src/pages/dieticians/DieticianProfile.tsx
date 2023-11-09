import React from "react";
import DieticianAccount from "../../components/Dashboard/dieticians/DieticianAccount";
import DieticianUpdateForm from "../../components/Dashboard/dieticians/DieticianUpdateForm";

const DieticianProfile = () => {
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <DieticianAccount/>
          <div className="md:col-span-2 md:px-[30px]">
            <DieticianUpdateForm/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DieticianProfile;
