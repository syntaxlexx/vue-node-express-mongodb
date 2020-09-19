const validator = require('../helpers/validate');
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
        "email": "required|email",
        "username": "required|string",
        "phone": "required|string",
        "password": "required|string|min:6|confirmed",
        "gender": "string"
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
 * Finally export all validations
 */
module.exports = {
    signup,
    tutorialsCrud,
}