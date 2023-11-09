import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxhooks";
import { DieticianFormData } from "../../../models";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDieticianProfile, updateDieticianProfile } from "../../../features/slices/dieticians/dieticianProfileSlics";

const DieticianUpdateForm = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const { dieticianProfile } = useAppSelector((state) => state.dieticianProfile);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<DieticianFormData>({
    name: "",
    email: "",
    password: "",
    about: "",
    role: "dietician",
    photo: selectedFile,
    services: [],
    membershipPrice: {
      oneSession: "",
      oneMonth: "",
      sixMonth: "",
      oneYear: "",
    },
  });

  const fetchData = async () => {
    await dispatch(getDieticianProfile())
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(dieticianProfile){
    setFormData({
      name: dieticianProfile.name,
      email: dieticianProfile.email,
      password: "",
      about: dieticianProfile.about,
      role: "dietician",
      photo: selectedFile,
      services: dieticianProfile.services,
      membershipPrice: {
        oneSession: dieticianProfile.membershipPrice?.oneSession,
        oneMonth: dieticianProfile.membershipPrice?.oneMonth,
        sixMonth: dieticianProfile.membershipPrice?.sixMonth,
        oneYear:dieticianProfile.membershipPrice?.oneYear,
      },
    });
  }
  }, [dieticianProfile]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (name.includes("membershipPrice.")) {
      const nestedProperty = name.split(
        "."
      )[1] as keyof DieticianFormData["membershipPrice"];
      updatedFormData.membershipPrice[nestedProperty] = value;
      setFormData(updatedFormData);
    } else if (name === "services") {
      // Check if the value is already in the services array
      if (formData.services.includes(value)) {
        // If it's already selected, remove it
        setFormData({
          ...formData,
          services: formData.services.filter((item) => item !== value),
        });
      } else {
        // If it's not selected, add it to the services array
        setFormData({
          ...formData,
          services: [...formData.services, value],
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // console.log(formData);
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
    await dispatch(updateDieticianProfile(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        console.log(res);
        fetchData();
      })
      .catch((err) => {
        toast.error(err);
      });
    setLoading(false);
  };

  return (
    <div className="rounded-lg py-4 md:py-10 bg-gray-800 px-4 md:px-10">
      <h3 className="text-white text-[22px] leading-9 font-bold mb-10">
        Update account
      </h3>
      <form className="py-4 md:py-0" onSubmit={handleSubmit}>
        <div className="mb-5">
        <label className="text-white font-bold text-[16px] leading-7">
            Name:
          </label>
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
        <label className="text-white font-bold text-[16px] leading-7">
            Email:
          </label>
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
        <label className="text-white font-bold text-[16px] leading-7">
            Password:
          </label>
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
        <div className="mb-5">
        <label className="text-white font-bold text-[16px] leading-7">
            About:
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="border border-solid border-blue-800 focus-outline 
              outline-primaryColor w-full px-4 py-3 rounded-md"
            rows={5}
            placeholder="Write about your Dietician"
          />
        </div>

       

        <div className="text-white mb-5 flex gap-10 items-center">
          <label
            htmlFor=""
            className=" font-bold text-[16px] leading-7"
          >
            Services:
          </label>
          <div className="w-full flex flex-wrap gap-4 justify-left">
            <label>
              <input
                type="checkbox"
                name="services"
                value="Dietary planning"
                checked={formData.services.includes("Dietary planning")}
                onChange={handleInputChange}
              />
              <span className="ml-2">Dietary planning</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Nutrition assessment"
                checked={formData.services.includes("Nutrition assessment")}
                onChange={handleInputChange}
              />
              <span className="ml-2">Nutrition assessment</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Sports nutrition"
                checked={formData.services.includes("Sports nutrition")}
                onChange={handleInputChange}
              />
              <span className="ml-2">Sports nutrition</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="services"
                value="Vegan diet"
                checked={formData.services.includes("Vegan diet")}
                onChange={handleInputChange}
              />
              <span className="ml-2">Vegan diet</span>
            </label>
          </div>
        </div>

        <div className="text-white mb-5 flex gap-10">
          <label className=" font-bold text-[16px] leading-7">
            Membership Price:
          </label>
          <div className="flex flex-col">
            <div className="flex gap-5 items-center mb-5">
              <span className="w-[110px]">Single Session</span>
              <input
                type="text"
                name="membershipPrice.oneSession"
                placeholder="₹"
                value={formData.membershipPrice.oneSession}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-5  mb-5">
              <span className="w-[110px]">1 Month</span>
              <input
                type="text"
                name="membershipPrice.oneMonth"
                placeholder="₹"
                value={formData.membershipPrice.oneMonth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-5  mb-5">
              <span className="w-[110px]">6 Months</span>
              <input
                type="text"
                name="membershipPrice.sixMonth"
                placeholder="₹"
                value={formData.membershipPrice.sixMonth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-5  mb-5">
              <span className="w-[110px]">12 Months</span>
              <input
                type="text"
                name="membershipPrice.oneYear"
                placeholder="₹"
                value={formData.membershipPrice.oneYear}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-b border-solid border-blue-800 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <figure
            className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                flex items-center justify-center"
          >
            <img
              src={previewURL ? previewURL : dieticianProfile?.photo}
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
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={35} color="white" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DieticianUpdateForm;