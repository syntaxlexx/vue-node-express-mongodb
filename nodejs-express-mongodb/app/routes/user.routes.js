const { usersCreate } = require('../middlewares/validators');
const { authJwt } = require("../middlewares");

module.exports = (app, express) => {
  const controller = require("../controllers/user.controller.js");
  var router = express.Router()

  // Create a new item
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin, usersCreate], controller.create);

  // Retrieve all items
  router.get("/", [authJwt.verifyToken], controller.index);

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