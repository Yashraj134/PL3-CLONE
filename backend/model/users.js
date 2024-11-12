const pool = require("../config/db");

exports.getUser = async (email) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows; 
    } catch (err) {
        console.error("Error fetching user:", err);
        throw new Error("Error fetching user");
    }
};

exports.addUser = async (user) => {
    const { username, email, password } = user;
    try {
        const result = await pool.query(
            "INSERT INTO users (email, password, username) VALUES (?, ?, ?)", 
            [email, password, username] // No need to hash again
        );
        return result[0]; // Return the result of the query
    } catch (err) {
        console.error("Error adding user:", err);
        throw new Error("Error adding user");
    }
};
