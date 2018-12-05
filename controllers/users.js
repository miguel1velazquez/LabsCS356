const JWT = require("jsonwebtoken");
const User = require("../models/user")
const JWT_SECRET = require("../config/keys").JWT_SECRET;

signToken = user => {
    return JWT.sign({
        //Issuer
        iss: 'CS356Final',
        //Subject
        sub: user._id,
        //Issued at claim
        iat: new Date().getTime(),
        // Expire
        /// Cur time + 1 day
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        // Email and password
        console.log("UsersController.signUp called!")
        const {
            email,
            password
        } = req.value.body;

        // Check for user with same email
        const foundUser = await User.findOne({
            email
        });
        if (foundUser) {
            return res.status(403).json({
                error: "This email is already in use"
            })
        }

        const newUser = new User({
            email,
            password
        })
        // Save user to DB
        await newUser.save();

        //Sign the JWT
        const token = signToken(newUser);
        res.status(200).json({
            token
        });
    },
    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user)
        res.status(200).json({
            token
        });
    },
    secret: async (req, res, next) => {
        console.log("I managed to get here")
        res.json({
            secret: "Resource"
        })
    }
}