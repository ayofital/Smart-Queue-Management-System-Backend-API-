import mongoose from "mongoose"
import Branch from "./branch.model"

const counterschema = new mongoose.schema(
{
    label: {
        type: String,
        required: [true, "Counter label is required"],
        trim: true, // e.g "counter 1", "Window A"
    },

    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
    },

    assignedStaff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        default: null, // null until a staff is assigned
    },

    isOpen: {
        type: Boolean,
        default: false, // closed until staff opens it
    },
},
{ timestamps: true }
);

export default mongoose.model("Counter", counterschema);