const User = require("../models/userModels")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({
                message: "user already exists, you can login",
                success: false
            })
        }
        bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const newUser = await User.create({
                    name,
                    email,
                    password: hash
                })
                console.log(newUser);
                res.status(201).json({
                    message: "user created",
                    success: true
                })
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create user",
            success: false
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({
                message: "no account found",
                success: false
            })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(403).json({
                    message: "Wrong password",
                    success: false
                })
            }
            const token = jwt.sign({ email: user.email }, 'string')
            res.cookie("token", token)

            res.status(200).json({
                message: "user logged in",
                success: true,
                token,
                email,
                name: user.name
            })
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "login error",
            success: false
        })
    }

}

module.exports = { signup, login }