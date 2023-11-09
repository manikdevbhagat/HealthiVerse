import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
      default: "client",
    },
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    gymMemberships: [{ type: mongoose.Types.ObjectId, ref: "GymMembership" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;