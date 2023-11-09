import mongoose from "mongoose";

const GymSchema = new mongoose.Schema(
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
      default: "gym",
    },
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    phone: { type: Number },
    about: { type: String },
    services: {
      type: [String],
      default: ["Gym"],
    },
    openHours: {
      type: {
        from: {
          type: String,
        },
        to: {
          type: String,
        },
      },
      default: {
        from: "",
        to: "",
      },
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
    address: {
      type: String,
      default: null,
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

const Gym = mongoose.model("Gym", GymSchema);
export default Gym;