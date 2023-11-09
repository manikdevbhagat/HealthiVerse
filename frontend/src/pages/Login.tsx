import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../assets/images/login.jfif";
import { LoginFormData } from "../models";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { ClipLoader } from "react-spinners";
import { loginUser } from "../features/slices/auth/authSlice";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";

const Login = () => {
  //Navigate to home page if already logged in
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.login);
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const { loading } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err);
      });
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

          <div className="rounded-lg lg:rounded-l-[0px] lg:rounded-r-lg py-4 md:py-10 bg-gray-800 px-8 md:px-10">
            <h3 className="text-white text-[22px] leading-9 font-bold mb-10">
              Login To Your Account
            </h3>
            <form className="py-4 md:py-0" onSubmit={handleSubmit}>
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

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="py-3 px-4  bg-primaryColor hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  {loading ? <ClipLoader size={35} color="white" /> : "Login"}
                </button>
              </div>

              <p className="mt-5 text-white text-center">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-blue-400 font-medium ml-1">
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