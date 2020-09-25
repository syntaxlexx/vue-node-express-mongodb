const db = require("../../models");
const { signup, signIn } = require("./auth");
const { usersCreate } = require("./users");
const { tutorialsCrud } = require("./tutorials");
const { analyticsPost } = require("./analytics");

/**
 * check for the existence of a role
 *
 * @param req
 * @param res
 * @param next
 */
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
    signIn,
    usersCreate,
    tutorialsCrud,
    checkRolesExisted,
    analyticsPost,
}