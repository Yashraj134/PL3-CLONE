const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
require('dotenv').config();
const users = require('../model/users');

exports.signup = async (req, res) => {
    const { user } = req.body;
    const { username, email, password } = user;
    
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required...!" });
        }

        const rows = await users.getUser(email); 
        if (rows.length !== 0) { 
            return res.status(400).json({ message: "User already exists, please login" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword; // Set the hashed password

        const result = await users.addUser(user); 
        if (result.affectedRows === 0) {
            return res.status(500).json({ message: "Unable to add user" });
        }

        return res.status(201).json({ message: "User added successfully" });

    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    const { user } = req.body;
    const { email, password } = user;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required...!" });
        }

        const rows = await users.getUser(email); 
        if (rows.length === 0) {
            return res.status(404).json({ message: "User does not exist, please signup" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.userId }, process.env.DB_SECRET_KEY, { expiresIn: '1h' }); // Correct secret key
        return res.status(200).json({ token, user });

    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
};
