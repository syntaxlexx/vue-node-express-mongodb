const validator = require('../../helpers/validate');
const { validationConfig, formatValidationErrors } = require("../../../config/validation.config");

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
    "first_name": "required|string|max:255",
    "last_name": "required|string|max:255",
    "nickname": "nullable|string|max:255",
    "password": "required|string|max:255|min:4|confirmed",
    "gender": "required|string|max:6",
    "phone": "required|string|max:20",
    "roles": "required",
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
  usersCreate,
}