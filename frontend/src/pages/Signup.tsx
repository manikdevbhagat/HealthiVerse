import React, { useState } from "react";
import signupImg from "../assets/images/login.jfif";
import avatar from "../assets/images/patient-avatar.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewURL, setPreviewURL] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    photo: selectedFile,
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/*image*/}
          <div className="hidden h-full lg:block bg:primaryColor rounded-l-lg">
            <figure className="rounded-l-lg h-full">
              <img
                src={signupImg}
                alt=""
                className="w-full h-full object-cover rounded-l-lg "
              />
            </figure>
          </div>

          {/*signup form*/}
          <div className="rounded-r-lg py-10 bg-gray-100 px-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>{" "}
            </h3>
            <form className="py-4 md:py-0" onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
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

              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-[16px] leading-7"
                >
                  I am a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 ml-8 px-4 py-3
                  focus:outline-none"
                  >
                    <option value="client">Client</option>
                    <option value="gym">Gym Owner</option>
                    <option value="trainer">Trainer</option>
                    <option value="dietician">Dietician</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <figure
                  className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                flex items-center justify-center"
                >
                  <img src={avatar} alt="" className="rounded-full" />
                </figure>

                <div className="relative w-[160px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full opacity-0 cusor-pointer"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex
                    justify-center items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 
                    overflow-hidden bg-blue-300 text-headingColor font-semibold 
                    rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Signup
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;