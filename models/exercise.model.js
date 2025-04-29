import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  muscleGroups: { type: [String], default: [] },
  // images +
  userCreateExerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  typeExercise: {
    type: String,
    enum: ["officialExercise", "communityExercise", "personalExercise"],
    default: "officialExercise",
    required: true,
  },
});

export default mongoose.model("Exercise", ExerciseSchema);
