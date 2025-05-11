import mongoose from "mongoose";

const PaymentRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash", "transfer"],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("PaymentRecord", PaymentRecordSchema);
