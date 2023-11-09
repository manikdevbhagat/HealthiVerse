import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema(
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
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", MembershipSchema);
export default Membership;