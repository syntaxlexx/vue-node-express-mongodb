const validator = require('../../helpers/validate');
const { validationConfig, formatValidationErrors } = require("../../../config/validation.config");

/**
 * validate analytics dynamically analytics
 *
 * @param req
 * @param res
 * @param next
 */
const analyticsPost = (req, res, next) => {
  let validationRule;

  switch(req.params.key) {
    case 'traffic':
      validationRule = {
        "domain": "required|string|max:255",
        "url": "required|string|max:255",
        "query": "string",
        "browser": "string|max:255",
        "os": "string|max:255",
        "os_version": "string|max:255",
        "country": "string|max:255",
      }

      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(validationConfig.errorCode).send(formatValidationErrors(err));
        } else {
          next();
        }
      });
      break;

    case 'query':
      validationRule = {
        "domain": "required|string|max:255",
        "url": "required|string|max:255",
        "query_string": "string",
        "term": "string|max:255",
        "country": "string|max:255",
      }

      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(validationConfig.errorCode).send(formatValidationErrors(err));
        } else {
          next();
        }
      });
      break;

    default:
      next();
  }

}

module.exports = {
  analyticsPost,
}