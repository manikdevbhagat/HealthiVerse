import { useState, useEffect } from "react";
import starIcon from "../../assets/images/Star.png";
import Feedback from "../../components/Business/Feedback";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { useParams } from "react-router-dom";
import { getSingleGym } from "../../features/slices/gyms/singleGymSlice";
import { ClipLoader } from "react-spinners";
import MembershipPrice from "../../components/Business/MembershipPrice";
import BusinessAbout from "../../components/Business/BusinessAbout";

const GymDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { gym, loading } = useAppSelector((state) => state.singleGym);

  const fetchData = () => {
    if (id) {
      dispatch(getSingleGym(id)).unwrap().then(console.log).catch(console.log);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <ClipLoader size={65} color="blue" />
        </div>
      ) : (
        <section>
          <div className="max-w-[1170px] px-5 mx-auto">
            <div className="grid lg:grid-cols-3 gap-[50px]">
              <div className="lg:col-span-2">
                <div className="flex items-center flex-col gap-10 sm:flex-row sm:items-start">
                  <img
                    src={gym?.photo}
                    alt=""
                    className="max-w-[300px] max-h-[400px] rounded-xl"
                  />

                  <div>
                    <h3 className="text-headingColor text-[22px] leading-9 font-bold">
                      {gym?.name}
                    </h3>

                    <div className="flex items-center gap-[6px]">
                      <span
                        className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                  lg:leading:7 font-semiBold text-headingColor"
                      >
                        <img src={starIcon} alt="" /> {gym?.avgRating.toFixed(1)}
                      </span>

                      <span
                        className="text-[14px] leading-5 lg:text-[16px] lg:leading-7
                  font-[400] text-textColor"
                      >
                        ({gym?.totalRating})
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-headingColor text-[18px]">
                        Open Hours:
                      </h3>
                      <p className="mt-1 text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                        {gym?.openHours.from} - {gym?.openHours.to}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-headingColor text-[18px]">
                        Services Available:
                      </h3>
                      <p className="mt-1 text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                        {gym?.services.map((service, index) => (
                          <span key={index}>
                            {index === 0 ? "" : " | "}
                            {service}{" "}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-headingColor text-[18px]">
                        Address:
                      </h3>
                      <p className="mt-1 text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                        {gym?.address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-[50px] border-b border-solid border-[##0066ff34]">
                  <button
                    onClick={() => setTab("about")}
                    className={`${
                      tab === "about" &&
                      "border-b border-solid border-primaryColor"
                    } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semiBold`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setTab("feedback")}
                    className={`${
                      tab === "feedback" &&
                      "border-b border-solid border-primaryColor"
                    } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semiBold`}
                  >
                    Feedback
                  </button>
                </div>
                <div className="mt-[50px] ">
                  {tab === "about" && <BusinessAbout business={gym} />}
                  {tab === "feedback" && <Feedback business={gym} />}
                </div>
              </div>

              <div>
                <MembershipPrice business={gym} loading={loading} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GymDetails;