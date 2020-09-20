const validator = require('../helpers/validate');
const db = require("../models");
const User = db.users;
const validationErrorCode = 412;
const defaultValidationMessage = "The given data was invalid."
const formatErrors = (err) => {
    return {
        success: false,
        error: true,
        message: defaultValidationMessage,
        errors: err.errors
    }
}

/**
 * Validate signup
 *
 * @param req
 * @param res
 * @param next
 */
const signup = (req, res, next) => {
    const validationRule = {
        "email": "required|email|max:255",
        "username": "required|string|max:255",
        "phone": "required|string|max:20",
        "password": "required|string|min:6|confirmed",
        "gender": "string|max:6"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(validationErrorCode).send(formatErrors(err));
        } else {
            next();
        }
    });
}

/**
 * validate tutorials
 *
 * @param req
 * @param res
 * @param next
 */
const tutorialsCrud = (req, res, next) => {
    const validationRule = {
        "title": "required|string|max:255",
        "description": "required|string|max:1000",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(validationErrorCode).send(formatErrors(err));
        } else {
            next();
        }
    });
}


/**
 * validate users
 *
 * @param req
 * @param res
 * @param next
 */
const usersCreate = (req, res, next) => {
    const validationRule = {
        "username": "required|string|max:255|unique:User,username",
        "email": "required|string|email|max:255|unique:User,email",
        "password": "required|string|max:255|min:6|confirmed",
        "gender": "required|string|max:6",
        "phone": "required|string|max:20",
        "roles": "required",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(validationErrorCode).send(formatErrors(err));
        } else {
            next();
        }
    });
}

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (! db.DEFAULT_ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

/**
 * Finally export all validations
 */
module.exports = {
    signup,
    tutorialsCrud,
    usersCreate,
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
}