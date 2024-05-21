const bcrypt = require("bcrypt");
const { Parse } = require("parse/node");

// Функция для регистрации нового пользователя
const signup = async (req, res) => {
    const { username, password, email, birth_date } = req.body;

    try {
        // Проверяем, существует ли пользователь с таким именем
        const query = new Parse.Query(Parse.User);
        query.equalTo("username", username);
        const existingUser = await query.first();

        if (existingUser) {
            return res.json({ loggedIn: false, status: "Username taken" });
        }

        // Создаем нового пользователя
        const newUser = new Parse.User();
        newUser.set("username", username);
        newUser.set("password", password);
        newUser.set("email", email);
        newUser.set("birth_date", birth_date);

        // Сохраняем пользователя
        const savedUser = await newUser.signUp();

        // Возвращаем успешный результат
        req.session.user = {
            username: savedUser.get("username"),
            id: savedUser.id,
        };
        res.json({ loggedIn: true, username: savedUser.get("username") });
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
            username: user.get("username"),
            id: user.id,
        };
        res.json({ loggedIn: true, username: user.get("username") });
    } catch (error) {
        console.error("Login error:", error);
        res.json({ loggedIn: false, status: "Wrong email or password!" });
    }
};

module.exports = { signup, login };
