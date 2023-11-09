import mongoose from "mongoose";

const DieticianSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "dietician",
    },
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    about: { type: String },
    services: {
      type: [String],
      default: ["Dietary planning"],
    },
    membershipPrice: {
      type: {
        oneSession: {
          type: String,
          default: "",
        },
        oneMonth: {
          type: String,
          default: "",
        },
        sixMonth: {
          type: String,
          default: "",
        },
        oneYear: {
          type: String,
          default: "",
        },
      },
    },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    avgRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    memberships: [{ type: mongoose.Types.ObjectId, ref: "Membership" }],
  },
  { timestamps: true }
);

const Dietician = mongoose.model("Dietician", DieticianSchema);
export default Dietician;