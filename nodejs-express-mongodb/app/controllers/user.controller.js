const db = require("../models");
const Model = db.users;
const Role = db.roles;
const { getPaginationOptions, returnPaginated } = require('../helpers/paginator')
const resourceName = 'User'

/**
 * Retrieve all items from the database.
 * @param {*} req
 * @param {*} res
 */
exports.index = (req, res) => {
  const { page, size, username } = req.query;
  var condition = username
      ? { username: { $regex: new RegExp(username), $options: "i" } }
      : {};

  Model.paginate(condition, getPaginationOptions(page, size))
      .then((data) => {
        res.send(returnPaginated(data));
      })
      .catch((err) => {
        res.status(500).send({
          message:
              err.message || `Some error occurred while retrieving ${resourceName}s.`,
        });
      });
};


// Create and Save a new item
exports.create = (req, res) => {
  // Create a new item
  const user = new Model({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  // Save item in the database
  user
      .save(user)
      .then(data => {
        if (req.body.roles) {
          Role.find(
              {
                name: { $in: req.body.roles }
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  res.send({ message: "User was registered successfully!" });
                });
              }
          );
        } else {
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

              res.send({ message: "User was registered successfully!" });
            });
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || `Some error occurred while creating ${resourceName}.`
        });
      });
};

// Find a single item with an id
exports.show = (req, res) => {
  const id = req.params.id;

  Model.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: `Not found ${resourceName} with id ${id}` });
        else res.send(data);
      })
      .catch(err => {
        res
            .status(500)
            .send({ message: `Error retrieving ${resourceName} with id=${id}` });
      });
};

// Update an item by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Model.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update ${resourceName} with id=${id}. Maybe ${resourceName} was not found!`
          });
        } else {
          res.send(data);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error updating ${resourceName} with id=${id}`
        });
      });
};

// Delete an item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Model.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete ${resourceName} with id=${id}. Maybe ${resourceName} was not found!`
          });
        } else {
          res.send({
            message: `${resourceName} was deleted successfully!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete ${resourceName} with id=${id}`
        });
      });
};

// Delete all items from the database.
exports.deleteAll = (req, res) => {
  Model.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${resourceName}s were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || `Some error occurred while removing all ${resourceName}s.`
        });
      });
};
