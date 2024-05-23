const bcrypt = require("bcrypt");
const { Parse } = require("parse/node");

// Функция для регистрации нового пользователя
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким именем
    const query = new Parse.Query(Parse.User);
    query.equalTo("email", email);
    const existingUser = await query.first();

    if (existingUser) {
      return res
        .status(400)
        .json({ loggedIn: false, status: "Account already signed up" });
    }

    // Создаем нового пользователя
    const newUser = new Parse.User();
    newUser.set("username", username);
    newUser.set("email", email);
    newUser.set("password", password);

    // Сохраняем пользователя
    const savedUser = await newUser.signUp();

    // Возвращаем успешный результат
    req.session.user = {
      email: savedUser.email,
      id: savedUser.id,
    };
    res.status(200).json({ loggedIn: true, email: savedUser.email, savedUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Функция для входа пользователя
const login = async (req, res) => {
  const { email, password } = req.body; // Теперь мы получаем email вместо username

  try {
    // Ищем пользователя по email
    const user = await Parse.User.logIn(email, password);

    // Успешный вход
    req.session.user = {
      email: user.email,
      id: user.id,
    };
    res.status(200).json({ loggedIn: true, email: user.email });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ loggedIn: false, status: "Wrong email or password!" });
  }
};

module.exports = { signup, login };
