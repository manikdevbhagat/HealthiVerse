import React from "react";
import { useAppSelector } from "../hooks/reduxhooks";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoutes = ({ children, allowedRoles }: Props) => {
  const { token, role } = useAppSelector((state) => state.login);
  const isAllowed = allowedRoles.includes(role ? role : "");
  const accessibleRoutes =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;
  return accessibleRoutes;
};

export default ProtectedRoutes;