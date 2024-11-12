const jwt = require('jsonwebtoken');

const auth = (req, res, next) => { 
    try {
        const token = req.headers['authorization']?.split(' ')[1]; 

        if (!token) {
            console.log(req.headers)
            return res.status(401).json({ message: "Login/signup first" });
        }

        const decoded = jwt.verify(token, process.env.DB_SECRET_KEY); 
        req.user = decoded;
        next();
        
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(401).json({ message: "Invalid token. Please login/signup first." }); 
    }
}

module.exports=auth;
