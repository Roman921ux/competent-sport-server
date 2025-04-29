import User from "../models/user-model.js";

export const userController = {
  getMe: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);

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
  editMe: async (req, res) => {
    try {
      const userId = req.userId;
      const { name, email } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res
          .status(409)
          .json({ message: "Такая почта уже занята другим пользователем" });
      }

      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: { name, email },
        },
        { new: true },
      );

      if (!updateUser) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const { passwordHash, ...userDataUpdate } = updateUser._doc;

      res.json(userDataUpdate);
    } catch (err) {
      res.status(500).json({
        message: "Не вышло изменить данные пользователя",
      });
    }
  },
};
