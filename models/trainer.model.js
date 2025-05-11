import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Тренер" },
    description: { type: String, required: true, unique: true },
    photo: { type: String, default: null },
    specialization: { type: String, required: true }, // например: "Йога", "Силовые тренировки"
    experience: { type: Number, default: 0 }, // стаж в годах
    rating: { type: Number, default: 0, min: 0, max: 5 }, // рейтинг от 0 до 5
    contacts: {
      phone: { type: String, default: null },
      email: { type: String, default: null },
    },
    isActive: { type: Boolean, default: true }, // работает ли тренер в данный момент
  },
  { timestamps: true },
);

export default mongoose.model("Trainer", TrainerSchema);
