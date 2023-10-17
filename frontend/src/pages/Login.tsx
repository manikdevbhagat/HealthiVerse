import React, { useState } from "react";
import { Link } from "react-router-dom";

import signupImg from "../assets/images/login.jfif";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <section className="px-5 mx-5 lg:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/*image*/}
          <div className="hidden lg:block bg:primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt=""
                className="w-full object-cover max-h-[550px] rounded-l-lg "
              />
            </figure>
          </div>

          <div className="rounded-r-lg py-10 bg-gray-100 px-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Hello! <span className="text-primaryColor ">Welcome</span> back 🎉
            </h3>
            <form className="py-4 md:py-0">
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Login
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primaryColor font-medium ml-1"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;