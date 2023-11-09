import Review from "../models/ReviewSchema.js";
import Gym from "../models/GymSchema.js";
import Trainer from "../models/TrainerSchema.js";
import Dieitician from "../models/DieticianSchema.js";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter.js";

const ModelMap = {
  gym: Gym,
  trainer: Trainer,
  dietician: Dieitician,
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Reviews not found" });
  }
};

export const addReview = async (req, res) => {
  if (!req.body.business) req.body.business = req.params.id;
  if (!req.body.client) req.body.client = req.userId;
  // console.log(req.body);
  const { client, business, rating, reviewText, businessRole } = req.body;
  const query = {
    "business.businessType": capitalizeFirstLetter(businessRole),
    "business.businessData": business,
    client: client,
    rating: rating,
    reviewText: reviewText,
  };

  try {
    const exisitingReview = await Review.findOne({
      "business.businessData": req.body.business,
      client: req.body.client,
    });

    if (exisitingReview) {
      return res
        .status(400)
        .json({ success: false, message: "Review already exists" });
    }

    const newReview = new Review(query);
    const savedReview = await newReview.save();
    const Model = ModelMap[req.body.businessRole];
    await Model.findByIdAndUpdate(req.body.business, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      review: savedReview,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ success: false, messsage: "Failed to add review" });
  }
};