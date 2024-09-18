
const jwt = require("jsonwebtoken")


const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, JWT token is requires",
                success: false
            })
        }
        else {
            const data = jwt.verify(token, "string")
            req.user = data;
            next()
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Unauthorized, JWT token is requires",
            success: false
        })
    }
}

module.exports = isAuthenticated;




