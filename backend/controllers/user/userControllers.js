const Parse = require("../../config/parseConfig");

const getUserById = async (userId) => {
  try {
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    return user ? user.toJSON() : null;
  } catch (error) {
    console.error(`Ошибка при получении пользователя с ID ${userId}: ${error.message}`);
    return null;
  }
};
module.exports = {
  getUserById,
};
