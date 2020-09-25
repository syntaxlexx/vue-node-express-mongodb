const validator = require('../../helpers/validate');
const { validationConfig, formatValidationErrors } = require("../../../config/validation.config");

/**
 * Validate signIn
 *
 * @param req
 * @param res
 * @param next
 */
const signIn = (req, res, next) => {
  const validationRule = {
    "username": "required|string|max:255",
    "password": "required|string|min:4|max:255",
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(validationConfig.errorCode).send(formatValidationErrors(err));
    } else {
      next();
    }
  });
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
    "email": "required|email|max:255|unique:User,email",
    "username": "required|string|max:255|unique:User,username",
    "first_name": "required|string|max:255",
    "last_name": "required|string|max:255",
    "nickname": "nullable|string|max:20",
    "phone": "required|string|max:20",
    "password": "required|string|min:4|confirmed",
    "gender": "string|max:6"
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(validationConfig.errorCode).send(formatValidationErrors(err));
    } else {
      next();
    }
  });
}

module.exports = {
  signIn,
  signup,
}