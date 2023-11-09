import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks.ts";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import BusinessCard from "../../components/Business/BusinessCard.tsx";
import { getAllTrainers } from "../../features/slices/trainers/allTrainersSlice.ts";

const Trainers = () => {
  const dispatch = useAppDispatch();
  const { trainers, loading } = useAppSelector((state) => state.allTrainers);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchData = () => {
    dispatch(getAllTrainers()).unwrap().then(console.log).catch(console.log);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  return (
    <>
      <section className="bg-white">
        <div className="container text-center">
          <h2 className="heading">Find a Trainer</h2>
          <div
            className="max-w-[570px] mt-[30px] mx-auto bg-purple-100
        rounded-md flex items-center justify-between"
          >
            <input
              type="search"
              value={searchInput}
              onChange={handleSearch}
              className="py-4 pl-4 pr-2 bg-transparent w-full 
          focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Trainers"
            />
          </div>
        </div>
      </section>

      <>
        {loading ? (
          <div className="h-[300px] flex justify-center items-center">
            <ClipLoader size={65} color="blue" />
          </div>
        ) : (
          <section className="pt-0">
            <div className="container">
              <div className="flex gap-5 flex-wrap justify-around">
                {trainers.map((trainer) =>
                  trainer.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ? (
                    <Link key={trainer._id} to={`/trainers/${trainer._id}`}>
                      <BusinessCard business={trainer} />
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          </section>
        )}
      </>
    </>
  );
};

export default Trainers;