import { useAppSelector } from "../../../hooks/reduxhooks";
import AccountDetails from "../common/AccountDetails";

const DieticianAccount = () => {
  const { dieticianProfile } = useAppSelector((state) => state.dieticianProfile);
  const name = dieticianProfile ? dieticianProfile.name : "";
  const email = dieticianProfile ? dieticianProfile.email : "";
  const photo = dieticianProfile ? dieticianProfile.photo : "";
  return (
    <>
    <div className="pb-[50px] px-[30px] rounded-md">
      <AccountDetails name={name} email={email} photo={photo} />

    </div>
    </>
  );
};

export default DieticianAccount;