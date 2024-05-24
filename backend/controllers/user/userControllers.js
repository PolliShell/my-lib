const Parse = require("../../config/parseConfig");

const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Получение email пользователя
        const userEmail = user.get("email");

        res.json({
            user: {
                id: user.id,
                email: userEmail,
                ...user.toJSON()
            }
        });
    } catch (error) {
        console.error("Profile retrieval error: ", error);
        res.status(500).json({ message: "Failed to retrieve user profile" });
    }
};


const getUserById = async (userId) => {
    try {
        const userQuery = new Parse.Query(Parse.User);
        const user = await userQuery.get(userId);
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

module.exports={
    getUserProfile
}