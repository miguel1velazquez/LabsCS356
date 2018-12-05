const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../passport");

const {
    validateBody,
    schemas
} = require('../helpers/routerHelpers');
const UsersController = require("../controllers/users");

router.route('/signup')
    .post(
        validateBody(schemas.authSchema),
        UsersController.signUp)

router.route('/signin')
    .post(validateBody(schemas.authSchema),
        passport.authenticate('local', {
            session: false
        }), UsersController.signIn)

router.route('/secret')
    // Add middleware from Passport to check JWT
    .get(passport.authenticate('jwt', {
        session: false
    }), UsersController.secret)

module.exports = router;