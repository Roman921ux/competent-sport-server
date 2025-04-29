import { Joi, validate } from "express-validation";

export const userValidator = {
  editMe: validate({
    body: Joi.object({
      name: Joi.string().min(2).max(30).required().messages({
        "string.empty": "Имя обязательно для заполнения",
        "string.min": "Имя должно быть не менее {#limit} символов",
        "string.max": "Имя должно быть не более {#limit} символов",
        "any.required": "Поле имени обязательно",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Неверный формат почты",
        "string.empty": "Email обязателен для заполнения",
        "any.required": "Поле email обязательно",
      }),
    }),
  }),
};
