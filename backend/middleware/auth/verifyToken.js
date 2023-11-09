import jwt from "jsonwebtoken";
import User from "../../models/UserSchema.js";
import Gym from "../../models/GymSchema.js";

export const authenticate = async (req, res, next) => {
  const tokenBearer = req.headers.authorization;

  if (!tokenBearer || !tokenBearer.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "No token found. Authorization failed.",
    });
  }

  try {
    const token = tokenBearer.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Authorization failed.",
    });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  const userRole = req.role;

  if (!roles.includes(userRole)) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized." });
  }

  next();
};
