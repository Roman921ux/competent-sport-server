import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// models
import User from "../models/user-model.js";

export const authController = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          message: "Пользователь с такой почтой уже существует",
        });
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const docUser = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: hash,
        roles: "basic",
      });
      const savedUser = await docUser.save();

      const token = jwt.sign(
        {
          _id: savedUser._id,
        },
        "secret123",
        { expiresIn: "30d" },
      );
      const { passwordHash, ...userData } = savedUser._doc;

      return res.json({ ...userData, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не удалось зарегистрироваться",
      });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Пользователя с такой почтой не существует" });
      }

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash,
      );
      if (!isValidPassword) {
        return res.status(404).json({ message: "Не верный логин или пароль" });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        { expiresIn: "30d" },
      );
      const { passwordHash, ...userData } = user._doc;

      res.json({ ...userData, token });
    } catch (err) {
      res.status(500).json({
        message: "Не удалось автоизироваться",
      });
    }
  },
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const { passwordHash, ...userData } = user._doc;

      res.json(userData);
    } catch (err) {
      res.status(500).json({
        message: "Не вышло получить данные пользователя",
      });
    }
  },
};
