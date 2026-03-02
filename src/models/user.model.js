import mongoose from "mongoose";

const userSchema = new mongoose.schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    reguired: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },

  role: {
    type: String,
    enum: ["customer", "admin", "staff"],
    default: "customer",
    index: true,
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: function () {
      return this.role === "staff";
    }
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;