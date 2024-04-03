const User = require('../models/user');

exports.register = async (req, res, next) => {
    const { email } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "E-mail already registered" });
        }
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({ success: false, message: "Please provide email and password" });
        }
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        res.status(201).json({ success: true, user });
    } catch (error) {
        next(error);
    }
}



exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: "Logged out" });
}

exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
}
