import { Joi, validate } from "express-validation";

export const paymentRecordValidation = {
  createPayment: validate({
    body: Joi.object({
      trainerId: Joi.string().required().messages({
        "any.required": "ID тренера обязательно",
        "string.empty": "ID тренера не может быть пустым",
      }),
      amount: Joi.number().min(1).required().messages({
        "any.required": "Сумма платежа обязательна",
        "number.min": "Сумма должна быть больше 0",
        "number.base": "Сумма должна быть числом",
      }),
      paymentMethod: Joi.string()
        .valid("card", "cash", "transfer")
        .required()
        .messages({
          "any.required": "Способ оплаты обязателен",
          "any.only": "Допустимые способы оплаты: card, cash, transfer",
        }),
    }),
  }),
};
