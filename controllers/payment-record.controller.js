import PaymentRecord from "../models/payment-record.model.js";

export const paymentRecordController = {
  createPayment: async (req, res) => {
    try {
      const userId = req.userId;
      const { trainerId, amount, paymentMethod } = req.body;

      const docPaymentRecord = await PaymentRecord({
        userId,
        trainerId,
        amount,
        paymentMethod,
      });
      const savedPaymentRecord = await docPaymentRecord.save();
      res.status(200).json(savedPaymentRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка при создании платежа",
      });
    }
  },
  getPaymentUser: async (req, res) => {
    try {
      const userId = req.userId;

      const paymentRecordUser = await PaymentRecord.find({ userId }).populate(
        "trainerId",
      );
      if (!paymentRecordUser) {
        return res.status(404).json({
          message: "У пользователя нет покупок",
        });
      }
      res.status(200).json(paymentRecordUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка при создании платежа",
      });
    }
  },
};
