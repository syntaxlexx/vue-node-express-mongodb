const { usersCreate } = require('../middlewares/validation-middleware');

module.exports = (app, express) => {
  const controller = require("../controllers/user.controller.js");
  var router = express.Router()

  // Create a new item
  router.post("/", usersCreate, controller.create);

  // Retrieve all items
  router.get("/", controller.index);

  // Retrieve a single item with id
  router.get("/:id", controller.show);

  // Update a item with id
  router.put("/:id", usersCreate, controller.update);

  // delete all items
  router.delete("/", controller.deleteAll);

  // Delete an item  with id
  router.delete("/:id", controller.delete);

  app.use('/api/users', router);
};