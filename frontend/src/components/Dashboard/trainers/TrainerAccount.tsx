import { useAppSelector } from "../../../hooks/reduxhooks";
import AccountDetails from "../common/AccountDetails";

const TrainerAccount = () => {
  const { trainerProfile } = useAppSelector((state) => state.trainerProfile);
  const name = trainerProfile ? trainerProfile.name : "";
  const email = trainerProfile ? trainerProfile.email : "";
  const photo = trainerProfile ? trainerProfile.photo : "";
  return (
    <>
    <div className="pb-[50px] px-[30px] rounded-md">
      <AccountDetails name={name} email={email} photo={photo} />
     
    </div>
    </>
  );
};

export default TrainerAccount;