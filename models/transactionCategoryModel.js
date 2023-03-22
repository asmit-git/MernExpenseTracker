import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.ObjectId,
        ref: "Users",
    },
}, { timestamps: true })

export default mongoose.model('Categories', categorySchema)