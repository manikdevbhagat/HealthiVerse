import User from "../models/UserSchema.js";
import Gym from "../models/GymSchema.js";
import Trainer from "../models/TrainerSchema.js";
import Dietician from "../models/DieticianSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

const roleModelMap = {
  client: User,
  gym: Gym,
  trainer: Trainer,
  dietician: Dietician,
};

export const signup = async (req, res) => {
  const { name, email, password, role, photo } = req.body;
  try {
    //check which model to use based on role
    let Model = roleModelMap[role];

    //check if user exists
    let user = null;
    user = await Model.findOne({ email: email });
    if (user) {
      return res.status(400).json({success:false,  message: "Email already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new Model({
      name,
      email,
      password: hashPassword,
      photo,
      role,
    });

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Signup successfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const Models = [User, Gym, Trainer, Dietician];
  try {
    let user = null;

    //find user in each model
    for (const Model of Models) {
      const userFound = await Model.findOne({ email });
      if (userFound) {
        user = userFound;
        break;
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //match password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    //generate token
    const token = generateToken(user);
    const { password, role, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      user: { ...rest },
      role,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};