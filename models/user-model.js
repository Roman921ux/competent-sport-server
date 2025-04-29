import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, default: "Пользователь" },
    email: { type: String, require: true, unique: true },
    passwordHash: { type: String, require: true },
    role: {
      type: String,
      enum: ["basic", "admin"],
      default: "basic",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
