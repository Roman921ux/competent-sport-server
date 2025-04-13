import { Joi, validate } from "express-validation";

export const exerciseValidation = {
  create: validate({
    body: Joi.object({
      title: Joi.string().required().messages({
        "string.empty": "Название для упражнения обязательно",
      }),
    }),
  }),
};
