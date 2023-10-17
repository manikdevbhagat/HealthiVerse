import React from "react";
import GymCard from "../../components/Gyms/GymCard.tsx";
import { gyms } from "../../assets/data/gyms.ts";

const Gyms = () => {
  return (
    <>
      <section className="bg-white">
        <div className="container text-center">
          <h2 className="heading">Find a Gym</h2>
          <div
            className="max-w-[570px] mt-[30px] mx-auto bg-blue-100
        rounded-md flex items-center justify-between"
          >
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full 
          focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Gym"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="p-0">
        <div className="container">
          <div className="flex gap-5 flex-wrap justify-around">
            {gyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gyms;