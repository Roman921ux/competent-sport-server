import mongoose from "mongoose";

const SetSchema = new mongoose.Schema({
  weight: { type: Number, require: true },
  repeat: { type: Number, require: true },
  comment: { type: String, default: "" },
});

const ExercisesSchema = new mongoose.Schema({
  comment: { type: String, default: "" },
  sets: {
    type: [SetSchema],
    default: [],
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
});

const WorkoutSchema = new mongoose.Schema({
  title: { type: String, require: true },
  comment: { type: String, default: "" },
  date: { type: Date, default: Date.now() },
  exercises: { type: [ExercisesSchema], default: [] },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Workout", WorkoutSchema);
