import React, { useState, useEffect } from "react";
import signupImg from "../assets/images/login.jfif";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { SignupFormData } from "../models";
import { signupUser } from "../features/slices/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt, BiSolidUser } from "react-icons/bi";

const Signup = () => {
  //Navigate to home page if already logged in
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.login);
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  const [selectedFile, setSelectedFile] = useState<string>("");
  const [previewURL, setPreviewURL] = useState("");
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  // const {message} = useAppSelector(state=>state.message);
  const { loading } = useAppSelector((state) => state.signup);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    role: "client",
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
    if (!e.target.files) return;
    setIsImageUploading(true);
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    setIsImageUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(signupUser(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err);
      });
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
          <div className="rounded-r-lg py-4 md:py-10 bg-gray-800 px-4 md:px-10">
            <h3 className="text-white text-[22px] leading-9 font-bold mb-10">
              Create a new account
            </h3>
            <form className="py-4 md:py-0" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <BiSolidUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className=" rounded-r-lg flex-1 appearance-none 
                    border border-gray-300 w-full py-3 px-4 bg-white 
                    text-gray-700 placeholder-gray-400 shadow-sm text-base 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <MdEmail />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className=" rounded-r-lg flex-1 appearance-none 
                    border border-gray-300 w-full py-3 px-4 bg-white 
                    text-gray-700 placeholder-gray-400 shadow-sm text-base 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <BiSolidLockAlt />
                  </span>
                  <input
                    type="password"
                    placeholder="Your Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className=" rounded-r-lg flex-1 appearance-none 
                    border border-gray-300 w-full py-3 px-4 bg-white 
                    text-gray-700 placeholder-gray-400 shadow-sm text-base 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              

              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-white font-bold text-[16px] leading-7"
                >
                  I am a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 ml-8 px-4 py-3
                  focus:outline-none rounded-lg"
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
                  <img
                    src={
                      previewURL
                        ? previewURL
                        : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                    alt=""
                    className="h-full w-full rounded-full"
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
                  disabled={loading || isImageUploading}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? <ClipLoader size={35} color="white" /> : "Signup"}
                </button>
              </div>

              <p className="mt-5 text-white text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 font-medium ml-1"
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