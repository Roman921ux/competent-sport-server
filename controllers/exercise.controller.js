import Exercise from "../models/exercise.model.js";

export const exerciseController = {
  create: async (req, res) => {
    const body = req.body;

    try {
      const newExercise = new Exercise({
        title: body.title,
      });
      await newExercise.save();

      res.status(200).json(newExercise);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Не удалось создать упражнение" });
    }
  },
};
