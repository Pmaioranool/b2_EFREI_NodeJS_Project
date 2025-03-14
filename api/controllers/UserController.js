const User = require("../models/User.js");

class UserController {
    // Register
    static async registerPost(req, res) {
        try {
            const newUser = await User.register(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

// TODO: debug
    static async Debug(req, res) {
        try {
            const user = await User.getUser(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}


module.exports = UserController;
// export {registerPost, Debug};