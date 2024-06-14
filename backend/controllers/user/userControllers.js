const Parse = require("../../config/parseConfig");

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await new Parse.Query(Parse.User).get(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const mappedUser = {
      id: user.id,
      username: user.get("username"),
      email: user.get("email"),
      createdAt: user.get("createdAt"),
      updatedAt: user.get("updatedAt"),
    };

    res.json(mappedUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, phone } = req.body;
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    username && user.set("username", username);
    email && user.set("email", email);
    phone && user.set("phone", phone);

    await user.save(null, { useMasterKey: true });

    const updatedUserJSON = user.toJSON();

    res.json({
      id: updatedUserJSON.objectId,
      username: updatedUserJSON.username,
      email: updatedUserJSON.email,
      phone: updatedUserJSON.phone,
      createdAt: updatedUserJSON.createdAt,
      updatedAt: updatedUserJSON.updatedAt,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getUserById,
  updateUserById,
};
