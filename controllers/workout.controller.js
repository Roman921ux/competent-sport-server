import Workout from "../models/workout.models.js";

export const workoutController = {
  createWorkout: async (req, res) => {
    try {
      const userId = req.userId;
      const body = req.body;

      const newWorkout = new Workout({
        title: body.title,
        comment: body.comment,
        date: body.date,
        exercises: body.exercises,
        userId,
      });
      await newWorkout.save();
      res.status(200).json(newWorkout);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Ошибка при создании упражнения" });
    }
  },
};
