import { body } from "express-validator";

export const authValidator = {
  register: [
    body("name", "Введите свое имя").notEmpty(),
    body("email", "Не верный формат почты").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  login: [
    body("email", "Не верный формат почты").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
};
