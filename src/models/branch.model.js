import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    isActive: {
      type: boolean,
      index: true,
      default: true,
    },
  },
  { timestamps: true },
);

branchSchema.index({ name: 1 }, { unique: true });

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
