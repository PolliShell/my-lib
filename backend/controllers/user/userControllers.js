const Parse = require("../../config/parseConfig");

const getUserById = async (req, res) => {
  const userId = req.params?.id;
  try {
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getUserById,
};
