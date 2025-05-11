import Workout from "../models/workout.models.js";

export const statsController = {
  getExerciseStats: async (req, res) => {
    try {
      const userId = req.userId;
      const exerciseId = req.params.exerciseId;

      const userWorkouts = await Workout.find({ userId }).populate({
        path: "exercises.exerciseId",
        model: "Exercise",
      });

      if (!userWorkouts) {
        return res.status(404).json({
          message: "У вас еще нет ни одной созданной тренировки",
        });
      }

      const userExercises = userWorkouts.map((workout) =>
        workout.exercises.filter(
          (ex) => ex.exerciseId._id.toString() === exerciseId,
        ),
      );
      if (userExercises.length === 0) {
        return res.status(404).json({
          message: "В ваших тренировках нет такого упражнения",
        });
      }

      res.status(200).json(userExercises.flat());
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Не удалось получить статистику по упражнению" });
    }
  },
};
