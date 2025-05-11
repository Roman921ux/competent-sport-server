import Trainer from "../models/trainer.model.js";

// const trainersData = [
//   {
//     name: "Алексей Петров",
//     description:
//       "Профессиональный тренер по силовым тренировкам с 10-летним опытом",
//     photo: "https://example.com/trainers/alexey.jpg",
//     specialization: "Силовые тренировки",
//     experience: 10,
//     rating: 4.8,
//     contacts: {
//       phone: "+79161234567",
//       email: "alexey.petrov@example.com",
//     },
//   },
//   {
//     name: "Мария Иванова",
//     description:
//       "Сертифицированный инструктор по йоге, специалист по хатха и аштанга йоге",
//     photo: "https://example.com/trainers/maria.jpg",
//     specialization: "Йога",
//     experience: 7,
//     rating: 4.9,
//     contacts: {
//       phone: "+79167654321",
//       email: "maria.ivanova@example.com",
//     },
//   },
//   {
//     name: "Дмитрий Соколов",
//     description: "Тренер по функциональному тренингу и кроссфиту",
//     photo: "https://example.com/trainers/dmitry.jpg",
//     specialization: "Кроссфит",
//     experience: 5,
//     rating: 4.7,
//     contacts: {
//       phone: "+79165557788",
//       email: "dmitry.sokolov@example.com",
//     },
//   },
//   {
//     name: "Екатерина Кузнецова",
//     description:
//       "Специалист по пилатесу и стретчингу, помогает в реабилитации после травм",
//     photo: "https://example.com/trainers/ekaterina.jpg",
//     specialization: "Пилатес",
//     experience: 8,
//     rating: 4.9,
//     contacts: {
//       phone: "+79169998877",
//       email: "ekaterina.k@example.com",
//     },
//   },
//   {
//     name: "Иван Жуков",
//     description: "Эксперт по боевым искусствам и самообороне",
//     photo: "https://example.com/trainers/ivan.jpg",
//     specialization: "Боевые искусства",
//     experience: 12,
//     rating: 4.8,
//     contacts: {
//       phone: "+79163332211",
//       email: "ivan.zhukov@example.com",
//     },
//   },
//   {
//     name: "Ольга Белова",
//     description:
//       "Персональный тренер по фитнесу для женщин, специалист по коррекции фигуры",
//     photo: "https://example.com/trainers/olga.jpg",
//     specialization: "Женский фитнес",
//     experience: 6,
//     rating: 4.7,
//     contacts: {
//       phone: "+79164445566",
//       email: "olga.belova@example.com",
//     },
//   },
// ];

export const trainerController = {
  getAll: async (req, res) => {
    try {
      const trainers = await Trainer.find();
      // const ok = await Trainer.insertMany(trainersData);
      res.status(200).json(trainers);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Не вышло получить тренеров",
      });
    }
  },
};
