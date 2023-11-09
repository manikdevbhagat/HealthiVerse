import React from "react";
import { useAppSelector } from "../../../hooks/reduxhooks";
import AccountDetails from "../common/AccountDetails";

const GymAccount = () => {
  const { gymProfile } = useAppSelector((state) => state.gymProfile);
  const name = gymProfile ? gymProfile.name : "";
  const email = gymProfile ? gymProfile.email : "";
  const photo = gymProfile ? gymProfile.photo : "";
  return (
    <>
    <div className="pb-[50px] px-[30px] rounded-md">
      <AccountDetails name={name} email={email} photo={photo} />
    </div>
    </>
  );
};

export default GymAccount;