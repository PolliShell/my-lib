const bcrypt = require("bcrypt");
const {Parse} = require("parse/node");

// Функция для регистрации нового пользователя
const signup = async (req, res) => {
    const {username,email, password} = req.body;

    try {
        // Проверяем, существует ли пользователь с таким именем
        const query = new Parse.Query(Parse.User);
        query.equalTo("email", email);
        const existingUser = await query.first();

        if (existingUser) {
            return res
                .status(400)
                .json({loggedIn: false, status: "Account already signed up"});
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
        res.status(200).json({loggedIn: true, email: savedUser.email});
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

// Функция для входа пользователя
Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JAVASCRIPT_KEY, process.env.PARSE_MASTER_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userQuery = new Parse.Query(Parse.User);
        userQuery.equalTo("email", email);
        const user = await userQuery.first();

        if (!user) {
            return res.status(401).json({loggedIn: false, message: "Invalid email or password"});
        }

        const loggedInUser = await Parse.User.logIn(email, password);
        console.log("User Data: ", loggedInUser.toJSON());
        res.json({loggedIn: true, user: loggedInUser.toJSON()});
    } catch (error) {
        console.error("Login error: ", error);
        res.status(401).json({loggedIn: false, message: "Invalid email or password"});
    }
}


module.exports = {signup, login};
