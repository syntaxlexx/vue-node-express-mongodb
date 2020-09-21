module.exports = {
    secret: "lexx-secret-key",

    validationMessages: {
        usernameNotFound: 'Invalid login credentials.',
        emailNotFound: 'Invalid login credentials.',
        passwordError: 'Invalid login credentials.',
    },

    messages: {
        tokensMissing: "Authorization Required!",
        adminAccess: "The action is beyond your pay-grade!",
        sudoAccess: "Unauthorized Access!",
        moderatorAccess: "The action is beyond your pay-grade!",
        default: "Unauthorized Access!",
    }
};