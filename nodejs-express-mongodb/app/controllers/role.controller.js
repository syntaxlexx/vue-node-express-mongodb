const db = require("../models");
const Model = db.roles;
const resourceName = 'Role'

/**
 * Retrieve all items from the database.
 * @param {*} req 
 * @param {*} res 
 */
exports.index = (req, res) => {
  Model.find()
    .then(data => {
      res.send({
        data: data.docs || [],
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving ${resourceName}s.`,
      });
    });
};

// Create and Save a new item
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  // Create an item
  const item = new Model({
    name: req.body.name,
    description: req.body.description,
  });

  // Save item in the database
  item
    .save(item)
    .then(data => {
      res.send(data);
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
        res.status(404).send({ message: `Not found ${resourceName} with id ${id}`});
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
  if (!req.name) {
    return res.status(400).send({
      message: "Name to update can not be empty!"
    });
  }

  const id = req.params.id;

  Model.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ${resourceName} with id=${id}. Maybe ${resourceName} was not found!`
        });
      } else res.send({ message: `${resourceName} was updated successfully.` });
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
