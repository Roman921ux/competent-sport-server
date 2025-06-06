import { Joi, validate } from "express-validation";

export const workoutValidation = {
  createWorkout: validate({
    body: Joi.object({
      title: Joi.string().required().messages({
        "string.empty": "Название тренировки обязательно",
      }),
      comment: Joi.string().allow("").optional().messages({
        "string.base": "Комментарий должен быть строкой",
      }),
      date: Joi.date().required().messages({
        "date.base": "Неверный формат даты",
      }),
      exercises: Joi.array()
        .items(
          Joi.object({
            exerciseId: Joi.string().required().messages({
              "string.empty": "id упражнения обязательно",
            }),
            comment: Joi.string().allow("").optional().messages({
              "string.base": "Комментарий должен быть строкой",
            }),
            sets: Joi.array().items(
              Joi.object({
                weight: Joi.number().required().messages({
                  "number.base": "Вес должен быть числом",
                }),
                repeat: Joi.number().required().messages({
                  "number.base": "Количество повторений должно быть числом",
                }),
                comment: Joi.string().optional().allow("").messages({
                  "string.base": "Комментарий должен быть строкой",
                }),
              }),
            ),
          }),
        )
        .optional(),
    }),
  }),
  editWorkout: validate({
    body: Joi.object({
      title: Joi.string().required().messages({
        "string.empty": "Название тренировки обязательно",
      }),
      comment: Joi.string().allow("").optional().messages({
        "string.base": "Комментарий должен быть строкой",
      }),
      date: Joi.date().required().messages({
        "date.base": "Неверный формат даты",
      }),
    }),
  }),
  addSetToExercise: validate({
    body: Joi.object({
      weight: Joi.number().required().messages({
        "number.base": "Вес должен быть числом",
      }),
      repeat: Joi.number().required().messages({
        "number.base": "Количество повторений должно быть числом",
      }),
      comment: Joi.string().optional().allow("").messages({
        "string.base": "Комментарий должен быть строкой",
      }),
    }),
  }),
  // new version
  editSetToExercise: validate({
    body: Joi.object({
      weight: Joi.number().required().messages({
        "number.base": "Вес должен быть числом",
      }),
      repeat: Joi.number().required().messages({
        "number.base": "Количество повторений должно быть числом",
      }),
      comment: Joi.string().optional().allow("").messages({
        "string.base": "Комментарий должен быть строкой",
      }),
    }),
  }),
};
