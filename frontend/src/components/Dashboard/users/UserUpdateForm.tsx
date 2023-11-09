import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxhooks";
import { SignupFormData } from "../../../models";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";
import { HashLoader } from "react-spinners";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../features/slices/users/userProfileSlice";
import { toast } from "react-toastify";

const UserUpdateForm = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const { userProfile } = useAppSelector((state) => state.userProfile);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    role: "client",
    photo: selectedFile,
  });

  const fetchData = async () => {
    await dispatch(getUserProfile())
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFormData({
      name: userProfile ? userProfile.name : "",
      email: userProfile ? userProfile.email : "",
      password: "",
      role: "client",
      photo: selectedFile,
    });
  }, [userProfile]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(updateUserProfile(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        fetchData();
      })
      .catch((err) => {
        toast.error(err);
      });
    setLoading(false);
  };

  return (
    <div className="rounded-lg py-6 md:py-10 bg-gray-800 px-6 md:px-10">
      <h3 className="text-headingColor text-[22px] text-white leading-9 font-bold mb-10">
        Update Account
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
          />
        </div>

        <div className="mb-5 flex items-center gap-3">
          <figure
            className="w-[60px] h-[60px] rounded-full
                flex items-center justify-center"
          >
            <img
              src={previewURL ? previewURL : userProfile?.photo}
              alt=""
              className="h-16 w-16 rounded-full"
            />
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
                    overflow-hidden bg-gray-300 text-headingColor font-semibold 
                    rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="py-4 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            {loading ? <HashLoader size={35} color="white" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;