const Parse = require("../../config/parseConfig");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = new Parse.Query(Parse.User);

    // Fetch the user by ID
    const user = await query.get(userId);

    if (user) {
      // Convert the Parse.User object to JSON
      const userJSON = user.toJSON();

      // Only include safe fields
      const response = {
        id: user.id,
        username: user.get("username"),
        email: user.get("email"),
        createdAt: user.get("createdAt"),
        updatedAt: user.get("updatedAt")
      };

      res.json(response);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(`Ошибка при получении пользователя с ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({ error: "Необходимо указать хотя бы одно поле для обновления" });
    }

    const query = new Parse.Query(Parse.User);

    const user = await query.get(userId);

    if (user) {
      if (username) user.set("username", username);
      if (email) user.set("email", email);

      await user.save(null, { useMasterKey: true });

      const updatedUserJSON = user.toJSON();

      res.json({
        id: updatedUserJSON.objectId,
        username: updatedUserJSON.username,
        email: updatedUserJSON.email,
        createdAt: updatedUserJSON.createdAt,
        updatedAt: updatedUserJSON.updatedAt
      });
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    console.error(`Ошибка при обновлении пользователя с ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

module.exports = { updateUserById };

module.exports = {
  getUserById,
  updateUserById
};
