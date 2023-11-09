import Gym from "../models/GymSchema.js";
import Membership from "../models/MembershipSchema.js"; 

export const updateGym = async (req, res) => {
  const id = req.userId;
  // console.log(id);
  try {
    const updatedGym = await Gym.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Gym updated successfully",
      gym: {...updatedGym._doc},
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gym update failed" });
  }
};

export const deleteGym = async (req, res) => {
  const id = req.params.id;
  try {
    await Gym.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Gym deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gym deletion failed" });
  }
};

export const getSingleGym = async (req, res) => {
  const id = req.params.id;
  try {
    const singleGym = await Gym.findById(id)
      .populate("reviews")
      .select("-password");

    res
      .status(200)
      .json({ success: true, message: "Gym found", gym: singleGym });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gym not found" });
  }
};

export const getAllGym = async (req, res) => {
  try {
    const allGyms = await Gym.find({isApproved: "approved"}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Gyms found", gyms: allGyms });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gyms not found" });
  }
};

export const getGymProfile = async (req, res) => {
  const gymId = req.userId;

  try {
    const gym = await Gym.findById(gymId).select("-password");
    if (!gym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Received profile info",
        gym: { ...gym._doc},
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error getting gym profile" });
  }
};

export const getMemberships = async (req, res) => {
  const gymId = req.userId;

  try {
    const gymMemberships = await Membership.find({ "business.businessData": gymId }).populate("client", "name photo");
    let memberships = [];
    for(const membership of gymMemberships){
      memberships.push({endDate: membership.endDate, name: membership.client.name, photo: membership.client.photo, _id: membership.client._id});
    }
    res.status(200).json({
      success: true,
      message: "Received memberships",
      memberships: memberships,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error getting memberships" });
  }
};