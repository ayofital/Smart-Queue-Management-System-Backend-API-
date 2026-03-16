import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const staffSchema = new mongoose.Schema(
 {
    name : {
        type: String,
        required: [true, "Staff name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false,
    },

    role: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff",
    },

    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        default: null,
    },

    isActive: {
        type: Boolean,
        default: true,
    },
 },
 { timestamps: true }
);

staffSchema.index({ email: 1 }, { unique: true });

// Hash password before saving
staffSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method 
staffSchema.methods.comparePassword = async function (candidatepassword) {
    return await bcrypt.compare(candidatepassword, this.password);
};

export default mongoose.model("Staff", staffSchema);