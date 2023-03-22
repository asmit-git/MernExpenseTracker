import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required:true
    },
    color: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.ObjectId,
        ref: "Users",
    },
}, { timestamps: true })

export default mongoose.model('Transactions', transactionSchema)