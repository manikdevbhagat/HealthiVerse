import mongoose from "mongoose";
import Gym from "./GymSchema.js";
import Trainer from "./TrainerSchema.js";
import Dieitician from "./DieticianSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    business: {
      businessType: {
        type: String,
        enum: ["Gym", "Trainer", "Dietician"],
        required: true,
      },
      businessData: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "business.businessType",
        required: true,
      },
    },
    client: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "client",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calculateAvgRating = async function (business) {
  
  const ModelMap = {
    "Gym": Gym,
    "Trainer": Trainer,
    "Dietician": Dieitician
  }
  const stats = await this.aggregate([
    {
      $match: { "business.businessData": business.businessData },
    },
    {
      $group: {
        _id: "$business.businessData",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const Model = ModelMap[business.businessType];
  await Model.findByIdAndUpdate(business.businessData, {
    totalRating: stats[0].numOfRating,
    avgRating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calculateAvgRating(this.business);
});

export default mongoose.model("Review", reviewSchema);
