const db = require("../models");
const Model = db.tutorials;
const { getPaginationOptions, returnPaginated } = require('../helpers/paginator')
const resourceName = 'Tutorial'

/**
 * Retrieve all items from the database.
 * @param {*} req 
 * @param {*} res 
 */
exports.index = (req, res) => {
  const { page, size, search } = req.query;
  var condition = search
    ? { title: { $regex: new RegExp(search), $options: "i" } }
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
  const item = new Model({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
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

/**
 * Find all published items
 * @param {*} req 
 * @param {*} res 
 */
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Model.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        tutorials: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving ${resourceName}s.`,
      });
    });
};