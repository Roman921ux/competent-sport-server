import { Joi, validate } from "express-validation";

export const exerciseValidation = {
  createOfficialExercise: validate({
    body: Joi.object({
      title: Joi.string().required().messages({
        "string.empty": "Название упражнения обязательно",
        "any.required": "Поле 'title' обязательно для заполнения",
      }),
      description: Joi.string().allow("").default("").optional(),
      muscleGroups: Joi.array().items(Joi.string()).required().messages({
        "array.base": "muscleGroups должен быть массивом",
        "array.includes": "Каждый элемент muscleGroups должен быть строкой",
        "any.required": "Поле 'muscleGroups' обязательно для заполнения",
      }),
      // typeExercise: Joi.string().valid("officialExercise").required().messages({
      //   "string.empty": "Тип упражнения обязателен",
      //   "any.only":
      //     "Тип упражнения должен быть либо communityExercise, либо personalExercise",
      //   "any.required": "Поле 'typeExercise' обязательно для заполнения",
      // }),
    }),
  }),
  createUsersExercise: validate({
    body: Joi.object({
      title: Joi.string().required().messages({
        "string.empty": "Название упражнения обязательно",
        "any.required": "Поле 'title' обязательно для заполнения",
      }),
      description: Joi.string().allow("").default("").optional(),
      muscleGroups: Joi.array().items(Joi.string()).required().messages({
        "array.base": "muscleGroups должен быть массивом",
        "array.includes": "Каждый элемент muscleGroups должен быть строкой",
        "any.required": "Поле 'muscleGroups' обязательно для заполнения",
      }),
      typeExercise: Joi.string()
        .valid("communityExercise", "personalExercise")
        .required()
        .messages({
          "string.empty": "Тип упражнения обязателен",
          "any.only":
            "Тип упражнения должен быть либо communityExercise, либо personalExercise",
          "any.required": "Поле 'typeExercise' обязательно для заполнения",
        }),
    }),
  }),
  editOfficialExercise: validate({
    body: Joi.object({
      title: Joi.string().optional().messages({
        "string.empty": "Название не может быть пустым",
        "string.base": "Название должно быть строкой",
      }),
      description: Joi.string().allow("").optional(),
      muscleGroups: Joi.array().items(Joi.string()).optional(),
      typeExercise: Joi.string()
        .valid("communityExercise", "personalExercise", "officialExercise")
        .required()
        .messages({
          "string.empty": "Тип упражнения обязателен",
          "any.only":
            "Тип упражнения должен быть либо communityExercise, либо personalExercise",
          "any.required": "Поле 'typeExercise' обязательно для заполнения",
        })
        .optional(),
    }).min(1),
  }),
  editUsersExercise: validate({
    body: Joi.object({
      title: Joi.string().optional().messages({
        "string.empty": "Название не может быть пустым",
        "string.base": "Название должно быть строкой",
      }),
      description: Joi.string().allow("").optional(),
      muscleGroups: Joi.array().items(Joi.string()).optional(),
      typeExercise: Joi.string()
        .valid("communityExercise", "personalExercise")
        .required()
        .messages({
          "string.empty": "Тип упражнения обязателен",
          "any.only":
            "Тип упражнения должен быть либо communityExercise, либо personalExercise",
          "any.required": "Поле 'typeExercise' обязательно для заполнения",
        })
        .optional(),
    }).min(1),
  }),
};
