import Dietician from "../models/DieticianSchema.js";
import Membership from "../models/MembershipSchema.js";

export const updateDietician = async (req, res) => {
  const id = req.userId;
  // console.log(id);
  try {
    const updatedDietician = await Dietician.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Dietician updated successfully",
      data: { ...updatedDietician._doc },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Dietician update failed" });
  }
};

export const deleteDietician = async (req, res) => {
  const id = req.params.id;
  try {
    await Dietician.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Dietician deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Dietician deletion failed" });
  }
};

export const getSingleDietician = async (req, res) => {
  const id = req.params.id;
  try {
    const singleDietician = await Dietician.findById(id)
      .populate("reviews")
      .select("-password");

    res
      .status(200)
      .json({ success: true, message: "Dietician found", data: singleDietician });
  } catch (err) {
    res.status(500).json({ success: false, message: "Dietician not found" });
  }
};

export const getAllDietician = async (req, res) => {
  try {
    const allDieticians = await Dietician.find({isApproved: "approved"}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Dieticians found", data: allDieticians });
  } catch (err) {
    res.status(500).json({ success: false, message: "Dieticians not found" });
  }
};

export const getDieticianProfile = async (req, res) => {
  const dieticianId = req.userId;

  try {
    const dietician = await Dietician.findById(dieticianId).select("-password");
    if (!dietician) {
      return res
        .status(404)
        .json({ success: false, message: "Dietician not found" });
    }

    res.status(200).json({
      success: true,
      message: "Received Dietician profile info",
      data: dietician,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error getting Dietician profile" });
  }
};

export const getMemberships = async (req, res) => {
  const dieticianId = req.userId;

  try {
    const DieticianMemberships = await Membership.find({
      "business.businessData": dieticianId,
    }).populate("client", "name photo");
    let memberships = [];
    for (const membership of DieticianMemberships) {
      memberships.push({
        endDate: membership.endDate,
        name: membership.client.name,
        photo: membership.client.photo,
        _id: membership.client._id,
      });
    }
    res.status(200).json({
      success: true,
      message: "Received memberships",
      data: memberships,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error getting memberships" });
  }
};