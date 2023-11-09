import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { getUserMemberships } from "../../features/slices/users/userMembershipsSlice";
import MembershipCard from "../../components/Memberships/MebershipCard";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const UserMemberships = () => {
  const dispatch = useAppDispatch();
  const { memberships, loading } = useAppSelector(
    (state) => state.userMemberships
  );
  const { gyms, trainers, dieticians } = memberships;
  const [tab, setTab] = useState<"gym" | "trainer" | "dietician">("gym");

  const fetchUserMemberships = () => {
    dispatch(getUserMemberships())
      .unwrap()
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
          <div
            className="max-w-[570px] mt-[30px] mx-auto
        rounded-md flex flex-wrap items-center justify-center"
          >
            <div>
              <button
                onClick={() => setTab("gym")}
                className={`${
                  tab === "gym"
                    ? "btn bg-primaryColor"
                    : "btn bg-white text-black border border-black"
                } m-2 rounded-md`}
              >
                Gyms
              </button>
            </div>
            <div>
              <button
                onClick={() => setTab("trainer")}
                className={`${
                  tab === "trainer"
                    ? "btn bg-primaryColor"
                    : "btn bg-white text-black border border-black"
                } m-2 rounded-md`}
              >
                Trainers
              </button>
            </div>
            <div>
              <button
                onClick={() => setTab("dietician")}
                className={`${
                  tab === "dietician"
                    ? "btn bg-primaryColor"
                    : "btn bg-white text-black border border-black"
                } m-2 rounded-md`}
              >
                Dieticians
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="flex gap-5 flex-wrap justify-around">
            {loading && <ClipLoader size={45} color="blue" />}
            {tab === "gym" &&
              !loading &&
              (gyms.length > 0 ? (
                gyms.map((gym) => <MembershipCard key={gym._id} member={gym} memberType={"gym"} />)
              ) : (
                <div className="text-xl font-semibold">
                  You have no gym memberships
                </div>
              ))}
              {tab === "trainer" &&
              !loading &&
              (trainers.length > 0 ? (
                trainers.map((trainer) => <MembershipCard key={trainer._id} member={trainer} memberType={"trainer"} />)
              ) : (
                <div className="text-xl font-semibold">
                  You have no trainer memberships
                </div>
              ))}
            {tab === "dietician" && (dieticians.length > 0 ? (
              dieticians.map((dietician) => <MembershipCard key={dietician._id} member={dietician} memberType={"dietician"} />)
            ) : (
              <div className="text-xl font-semibold">You have no dieitician memberships</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserMemberships;