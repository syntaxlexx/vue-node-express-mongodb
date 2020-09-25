let defaultMessage = "The given data was invalid."
const formatValidationErrors = (err) => {
  return {
    success: false,
    error: true,
    message: defaultMessage,
    errors: err.errors
  }
}

const validationConfig = {
  errorCode: 422,
  defaultMessage: defaultMessage
};

module.exports = {
  validationConfig,
  formatValidationErrors,
}