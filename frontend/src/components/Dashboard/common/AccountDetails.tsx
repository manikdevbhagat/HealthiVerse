import { logout } from "../../../features/slices/auth/authSlice";
import { useAppDispatch } from "../../../hooks/reduxhooks";

interface Props {
  name: string;
  email: string;
  photo: string;
}

const AccountDetails = ({ name, email, photo }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="w-full max-w-xl px-5 py-4 mx-auto  rounded-lg shadow-lg bg-gray-800 text-gray-50">
        <div className="w-full pt-1 mx-auto -mt-16 text-center">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={photo}
              className="mx-auto object-cover rounded-full h-[200px] w-[200px] "
            />
          </a>
        </div>
        <div className="w-full mt-6">
          <div className="mb-6 text-center">
            <p className="text-xl font-medium text-white">{name}</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
          <button
            onClick={() => {
              dispatch(logout());
              localStorage.clear();
            }}
            type="button"
            className="py-2 px-4  bg-red-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;