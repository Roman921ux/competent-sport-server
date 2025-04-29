import Workout from "../models/workout.models.js";
import Exercise from "../models/exercise.model.js";
import mongoose from "mongoose";

export const workoutController = {
  createWorkout: async (req, res) => {
    try {
      const userId = req.userId;
      const body = req.body;

      console.log("создание ...");
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
      res.status(500).json({ message: "Ошибка при создании тренировк" });
    }
  },
  getAll: async (req, res) => {
    try {
      const userId = req.userId;
      const userWorkouts = await Workout.find({ userId }).populate(
        "exercises.exerciseId",
      );
      res.status(200).json(userWorkouts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при получении тренировок" });
    }
  },
  getOne: async (req, res) => {
    try {
      const workoutId = req.params.workoutId;
      const workout = await Workout.findById(workoutId).populate(
        "exercises.exerciseId",
      );
      if (!workout) {
        return res
          .status(404)
          .json({ message: "Такой тренировки не существует" });
      }

      res.status(200).json(workout);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при получении тренировок" });
    }
  },
  createSet: async (req, res) => {
    try {
      const userId = req.userId;
      const workoutId = req.params.workoutId;
      const exerciseId = req.params.exerciseId;
      const { weight, repeat, comment } = req.body;

      const workout = await Workout.findById(workoutId);
      if (!workout) {
        return res
          .status(404)
          .json({ message: "Такой тренировки не существует" });
      }

      const exercise = workout.exercises.find((ex) =>
        ex._id.equals(new mongoose.Types.ObjectId(exerciseId)),
      );
      if (!exercise) {
        return res.status(404).json({ message: "Упражнение не найдено" });
      }

      exercise.sets.push({ weight, repeat, comment });
      await workout.save();

      res.status(200).json(workout);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при создании сета" });
    }
  },
  editSet: async (req, res) => {
    try {
      const userId = req.userId;
      const workoutId = req.params.workoutId;
      const exerciseId = req.params.exerciseId;
      const setId = req.params.setId;
      const { weight, repeat, comment } = req.body;

      const workout = await Workout.findById(workoutId);
      if (!workout) {
        return res
          .status(404)
          .json({ message: "Такой тренировки не существует" });
      }

      const exercise = workout.exercises.find((ex) =>
        ex._id.equals(new mongoose.Types.ObjectId(exerciseId)),
      );
      if (!exercise) {
        return res.status(404).json({ message: "Упражнение не найдено" });
      }

      const set = exercise.sets.find((set) =>
        set._id.equals(new mongoose.Types.ObjectId(setId)),
      );
      if (!set) {
        return res
          .status(404)
          .json({ message: "Такого подхода не существует" });
      }

      set.weight = weight;
      set.repeat = repeat;
      set.comment = comment;

      await workout.save();
      res.status(200).json({ message: "Set обновлен", set });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при редактировании сета" });
    }
  },
  removeWorkout: async (req, res) => {
    try {
      const workoutId = req.params.workoutId;
      const removeWorkout = await Workout.findByIdAndDelete(workoutId);
      if (!removeWorkout) {
        return res.status(404).json({ message: "Тренировка не найдена" });
      }

      res.status(200).json({ message: "Тренировка удалена" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при удалении тренировки" });
    }
  },
  removeExercise: async (req, res) => {
    try {
      const workoutId = req.params.workoutId;
      const exerciseId = req.params.exerciseId;

      const removeExercise = await Workout.updateOne(
        { _id: workoutId },
        {
          $pull: { exercises: { _id: exerciseId } },
        },
      );

      if (removeExercise.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "Ошибка при удалении упражнения" });
      }

      res.status(200).json({ message: "Упражнение удалено" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при удалении упражнения" });
    }
  },
  removeSet: async (req, res) => {
    try {
      const { workoutId, exerciseId, setId } = req.params;

      const removeSet = await Workout.updateOne(
        {
          _id: workoutId,
          "exercises._id": exerciseId,
        },
        {
          $pull: {
            "exercises.$.sets": { _id: setId },
          },
        },
      );

      if (removeSet.modifiedCount === 0) {
        return res.status(404).json({ message: "Ошибка при удалении подхода" });
      }

      res.status(200).json({ message: "Подход удален" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошиба при удалении подхода" });
    }
  },
  editWorkout: async (req, res) => {
    try {
      const workoutId = req.params.workoutId;
      const { title, date, comment } = req.body;

      const updatedWorkout = await Workout.findByIdAndUpdate(
        workoutId,
        {
          $set: {
            ...(title && { title }),
            ...(comment !== undefined && { comment }),
            ...(date && { date }),
          },
        },
        { new: true },
      );

      if (!updatedWorkout) {
        return res.status(404).json({ message: "Тренировка не найдена" });
      }

      res.json(updatedWorkout);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при редактировании тренировки" });
    }
  },
  addExerciseToWorkout: async (req, res) => {
    try {
      const workoutId = req.params.workoutId;
      const exerciseId = req.params.exerciseId;

      if (
        !mongoose.Types.ObjectId.isValid(workoutId) ||
        !mongoose.Types.ObjectId.isValid(exerciseId)
      ) {
        return res.status(400).json({ message: "Некорректный ID" });
      }

      const existedExercise = await Exercise.findById(exerciseId);
      if (!existedExercise) {
        return res
          .status(404)
          .json({ message: "Такого упражнения не существует" });
      }

      const exerciseData = {
        exerciseId,
        comment: "",
        sets: [],
      };

      const updateWorkout = await Workout.findByIdAndUpdate(
        workoutId,
        { $push: { exercises: exerciseData } },
        { new: true },
      );
      if (!updateWorkout) {
        return res.status(404).json({ message: "Тренировка не найдена" });
      }

      res.status(201).json(updateWorkout);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Ошибка при добавлении упражнения в тренировку" });
    }
  },
};
