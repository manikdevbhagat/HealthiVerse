import UserUpdateForm from "../../components/Dashboard/users/UserUpdateForm";
import UserDetails from "../../components/Dashboard/users/UserDetails";

const UserProfile = () => {
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <UserDetails/>
          <div className="md:col-span-2 md:px-[30px]">
            <UserUpdateForm/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
