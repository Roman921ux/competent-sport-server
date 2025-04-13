import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  title: String,
  // групы мыщц
  // описание
});

export default mongoose.model("Exercise", ExerciseSchema);
