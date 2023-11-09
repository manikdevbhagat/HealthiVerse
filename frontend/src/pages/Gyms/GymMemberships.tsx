import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import MembershipCard from "../../components/Memberships/MebershipCard";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getGymMemberships } from "../../features/slices/gyms/gymMembershipsSlice";

const GymMemberships = () => {
  const dispatch = useAppDispatch();

  const { memberships, loading } = useAppSelector(
    (state) => state.gymMemberships
  );

  const fetchUserMemberships = () => {
    dispatch(getGymMemberships())
      .unwrap()
      .then(console.log)
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    fetchUserMemberships();
  }, []);

  return (
    <div>
      <section className="bg-white">
        <div className="container text-center">
          <h2 className="heading">My Memberships</h2>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="flex gap-5 flex-wrap justify-around">
            {loading && <ClipLoader size={45} color="blue" />}
            {!loading &&
              (memberships.length > 0 ? (
                memberships.map((member) => 
                <MembershipCard key={member._id} member={member} memberType="client"/>)
              ) : (
                <div className="text-xl font-semibold">
                  You have no memberships
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GymMemberships;