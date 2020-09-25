const validator = require('../../helpers/validate');
const { validationConfig, formatValidationErrors } = require("../../../config/validation.config");

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
      res.status(validationConfig.errorCode).send(formatValidationErrors(err));
    } else {
      next();
    }
  });
}

module.exports = {
  tutorialsCrud,
}