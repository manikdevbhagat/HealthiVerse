import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProfile from "../pages/users/UserProfile";
import UserMemberships from "../pages/users/UserMemberships";
import Chats from "../pages/Chats";
import Trainers from "../pages/trainers/Trainers";
import TrainerProfile from "../pages/trainers/TrainerProfile";
import TrainerDetails from "../pages/trainers/TrainerDetails";
import TrainerMemberships from "../pages/trainers/TrainerMemberships";
import Dieticians from "../pages/dieticians/Dieticians";
import DieticianDetails from "../pages/dieticians/DieticianDetails";
import DieticianProfile from "../pages/dieticians/DieticianProfile";
import DieticianMemberships from "../pages/dieticians/DieticianMemberships";
import About from "../pages/About";
import Gyms from "../pages/Gyms/Gyms.tsx";
import GymDetails from "../pages/Gyms/GymDetails.tsx";
import GymProfile from "../pages/Gyms/GymProfile.tsx";
import GymMemberships from "../pages/Gyms/GymMemberships.tsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gyms" element={<Gyms />} />
      <Route path="/gyms/:id" element={<GymDetails />} />
      <Route path="/trainers" element={<Trainers />} />
      <Route path="/trainers/:id" element={<TrainerDetails />} />
      <Route path="/dieticians" element={<Dieticians />} />
      <Route path="/dieticians/:id" element={<DieticianDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/chats" element={<Chats />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["client"]}>
            <UserProfile />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/users/memberships/my-memberships"
        element={
          <ProtectedRoutes allowedRoles={["client"]}>
            <UserMemberships />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/gyms/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["gym"]}>
            <GymProfile />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/gyms/memberships/my-memberships"
        element={
          <ProtectedRoutes allowedRoles={["gym"]}>
            <GymMemberships />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/trainers/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["trainer"]}>
            <TrainerProfile />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/trainers/memberships/my-memberships"
        element={
          <ProtectedRoutes allowedRoles={["trainer"]}>
            <TrainerMemberships />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/dieticians/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["dietician"]}>
            <DieticianProfile />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dieticians/memberships/my-memberships"
        element={
          <ProtectedRoutes allowedRoles={["dietician"]}>
            <DieticianMemberships />
          </ProtectedRoutes>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Routers;