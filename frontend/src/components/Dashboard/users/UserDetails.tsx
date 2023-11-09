import { useAppSelector } from "../../../hooks/reduxhooks";
import AccountDetails from "../common/AccountDetails";

const UserDetails = () => {
  const { userProfile } = useAppSelector((state) => state.userProfile);
  const name = userProfile ? userProfile.name : "";
  const email = userProfile ? userProfile.email : "";
  const photo = userProfile ? userProfile.photo : "";
  return (
    <div className="pb-[50px] px-[30px] rounded-md">
      <AccountDetails name={name} email={email} photo={photo} />
    </div>
  );
};

export default UserDetails;