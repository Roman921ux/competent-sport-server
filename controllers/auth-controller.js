import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// models
import User from "../models/user-model";

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
      const user = await Logistician.findOne({ email: req.body.email })
        .populate("companyPublicData")
        .exec();

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
      const user = await Logistician.findById(req.userId)
        .populate("companyPublicData")
        .exec();

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
  updateProfile: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      let companyId;

      // Если Имя компании есть (она будет, если заказчик меняет свои данные, или водитель решил стать заказчиком)
      if (req.body.nameCompany) {
        const commpany = await CompanyPublic.findOne({
          nameCompany: req.body.nameCompany,
        });

        if (commpany) {
          // если компания есть, возвращаем ее id в переменную сверху
          companyId = commpany._id;
        } else {
          // если компании нет, создаем ее и также возвращаем id в переменную выше

          const docCompanyPublic = new CompanyPublic({
            nameCompany: req.body.nameCompany,
          });
          const savedCompanyPublic = await docCompanyPublic.save();
          companyId = savedCompanyPublic._id;
        }
      }

      // Проверка на роль (роль будет приходить та, на которую мы будем обновлять сущность пользователя)
      // если решил остаться заказчиком или водитель захотел стать заказчиком
      // находим сущность пользователя
      const updatedUser = await Logistician.findByIdAndUpdate(
        req.userId,
        {
          userName: req.body.userName,
          phone: req.body.phone,
          roles: req.body.roles,
          companyPublicData: req.body.roles === "customer" ? companyId : null,
        },
        { new: true },
      );
      if (!updatedUser) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      res.json({
        updatedUser,
        message: "Даннык пользователя обновлены",
      });
    } catch (err) {
      res.status(500).json({
        message: "Не удалось обновить данные профиля",
      });
    }
  },
};
