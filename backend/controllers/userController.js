import User from "../models/UserSchema.js";
import Membership from "../models/MembershipSchema.js";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter.js";

export const updateUser = async (req, res) => {
  const id = req.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "User update failed" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "User deletion failed" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "User not found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Users found", data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Users not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Received profile info", user: user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error getting user profile" });
  }
};

export const getMemberships = async (req, res) => {
  const userId = req.userId;

  try {
    const memberships = await Membership.find({ client: userId }).populate({
      path: "business.businessData",
      select: "name photo",
    })
    let gyms = [], trainers=[], dieticians=[];
    for(const membership of memberships){
      const {business:{businessType, businessData:{name, photo, _id}}} = membership;
      if(businessType==="Gym"){
        gyms.push({endDate: membership.endDate, name: name, photo: photo, _id: _id});
      }
      if(businessType==="Trainer"){
        trainers.push({endDate: membership.endDate, name: name, photo: photo, _id: _id});
      }
      if(businessType==="Dietician"){
        dieticians.push({endDate: membership.endDate, name: name, photo: photo, _id: _id});
      }
    }
    
    res.status(200).json({ 
      success: true,
      message: "Received memberships",
      memberships: { gyms: gyms, trainers: trainers, dieticians: dieticians },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error getting memberships" });
  }
};

export const buyMembership = async (req, res) => {
  const userId = req.userId;
  const businessId = req.params.id;
  const { startDate, endDate, role } = req.body;
  console.log(userId);
  console.log(businessId);
  console.log(req.body);


  try {

    const exisitingMembership = await Membership.findOne({
      client: userId,
      "business.businessData": businessId,
    });

    if (exisitingMembership) {
      return res
        .status(400)
        .json({ success: false, message: "Active membership already exists" });
    }

    const newMembership = new Membership({
      client: userId,
      business: {
        businessType: capitalizeFirstLetter(role),
        businessData: businessId,
      },
      startDate: startDate,
      endDate: endDate,
    });

    await newMembership.save();
    res
      .status(200)
      .json({ success: true, message: "Membership bought successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};