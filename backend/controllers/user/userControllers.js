const Parse = require("../../config/parseConfig");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    if (user) {
      res.json(user.toJSON());
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    console.error(`Ошибка при получении пользователя с ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

module.exports = {
  getUserById,
};
