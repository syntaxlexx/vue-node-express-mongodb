const config = require("../../config/auth.config");
const db = require("../models");
const User = db.users;
const Role = db.roles;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const formatErrors = (msg, errors) => {
    return {
        success: false,
        error: true,
        message: msg,
        errors: errors
    }
}

/**
 * sign up user
 *
 * @param req
 * @param res
 */
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    nickname: req.body.nickname,
    phone: req.body.phone,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ name: "user" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        let pureUser = JSON.parse(JSON.stringify(user))
        delete pureUser['password']

        res.send({
          message: "Registration successfully!",
          user: pureUser,
        });
      });
    });

  });
};

/**
 * sign in user
 *
 * @param req
 * @param res
 */
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate({path: 'roles', select: '-_id -__v'})
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (! user) {
        return res.status(401)
            .send(formatErrors(config.validationMessages.usernameNotFound, {
                auth: [config.validationMessages.usernameNotFound]
            }));
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (! passwordIsValid) {
        return res.status(401)
            .send(formatErrors(config.validationMessages.passwordError, {
                auth: [config.validationMessages.passwordError]
            }));
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let pureUser = JSON.parse(JSON.stringify(user))
      delete pureUser['password']

      res.status(200).send({
        user:           pureUser,
        access_token:   token
      });
    });
};