import Exercise from "../models/exercise.model.js";

export const exerciseController = {
  createOfficialExercise: async (req, res) => {
    const body = req.body;
    const userId = req.userId;

    try {
      const newExercise = new Exercise({
        title: body.title,
        description: body.description,
        muscleGroups: body.muscleGroups,
        userCreateExerciseId: userId,
        typeExercise: "officialExercise",
      });
      await newExercise.save();

      res.status(200).json(newExercise);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Не удалось создать упражнение" });
    }
  },
  createUsersExercise: async (req, res) => {
    const { typeExercise, ...body } = req.body;
    const userId = req.userId;

    if (!["communityExercise", "personalExercise"].includes(typeExercise)) {
      return res.status(400).json({ error: "Invalid visibility type" });
    }

    try {
      const newExercise = new Exercise({
        title: body.title,
        description: body.description,
        muscleGroups: body.muscleGroups,
        userCreateExerciseId: userId,
        typeExercise,
      });
      await newExercise.save();

      res.status(200).json(newExercise);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Не удалось создать упражнение" });
    }
  },
  getAll: async (req, res) => {
    try {
      const exercises = await Exercise.find();

      res.status(200).json(exercises);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Не удалось получить упражнения" });
    }
  },
  getOneById: async (req, res) => {
    try {
      const exerciseId = req.params.exerciseId;
      const exercise = await Exercise.findById(exerciseId);

      if (!exercise) {
        return res
          .status(404)
          .json({ message: "Такого упражнения не существует" });
      }

      res.status(200).json(exercise);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось получить упражнение" });
    }
  },
  editOfficialExercise: async (req, res) => {
    try {
      const exerciseId = req.params.exerciseId;
      const updateData = req.body;

      const existingExercise = await Exercise.findById(exerciseId);
      if (!existingExercise) {
        return res
          .status(404)
          .json({ message: "Такого упражнения не существует" });
      }

      const editedExercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        { $set: updateData },
        { new: true, runValidators: true },
      );

      if (!editedExercise) {
        return res.status(404).json({ message: "Упражнение не найдено" });
      }

      res.status(200).json(editedExercise);
    } catch (error) {
      console.error(error);
    }
  },
  editUsersExercise: async (req, res) => {
    try {
      const exerciseId = req.params.exerciseId;
      const updateData = req.body;

      const existingExercise = await Exercise.findById(exerciseId);
      if (!existingExercise) {
        return res
          .status(404)
          .json({ message: "Такого упражнения не существует" });
      }

      const editedExercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        { $set: updateData },
        { new: true, runValidators: true },
      );

      if (!editedExercise) {
        return res.status(404).json({ message: "Упражнение не найдено" });
      }

      res.status(200).json(editedExercise);
    } catch (error) {
      console.error(error);
    }
  },
};
