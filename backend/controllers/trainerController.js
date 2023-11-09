import Trainer from "../models/TrainerSchema.js";
import Membership from "../models/MembershipSchema.js";

export const updateTrainer = async (req, res) => {
  const id = req.userId;
  // console.log(id);
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      data: { ...updatedTrainer._doc },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Trainer update failed" });
  }
};

export const deleteTrainer = async (req, res) => {
  const id = req.params.id;
  try {
    await Trainer.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Trainer deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Trainer deletion failed" });
  }
};

export const getSingleTrainer = async (req, res) => {
  const id = req.params.id;
  try {
    const singleTrainer = await Trainer.findById(id)
      .populate("reviews")
      .select("-password");

    res
      .status(200)
      .json({ success: true, message: "Trainer found", data: singleTrainer });
  } catch (err) {
    res.status(500).json({ success: false, message: "Trainer not found" });
  }
};

export const getAllTrainer = async (req, res) => {
  try {
    const allTrainers = await Trainer.find({isApproved: "approved"}).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Trainers found", data: allTrainers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Trainers not found" });
  }
};

export const getTrainerProfile = async (req, res) => {
  const trainerId = req.userId;

  try {
    const trainer = await Trainer.findById(trainerId).select("-password");
    if (!trainer) {
      return res
        .status(404)
        .json({ success: false, message: "Trainer not found" });
    }

    res.status(200).json({
      success: true,
      message: "Received trainer profile info",
      data: trainer,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error getting trainer profile" });
  }
};

export const getMemberships = async (req, res) => {
  const trainerId = req.userId;

  try {
    const trainerMemberships = await Membership.find({
      "business.businessData": trainerId,
    }).populate("client", "name photo");
    let memberships = [];
    for (const membership of trainerMemberships) {
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