const { authJwt } = require("../middlewares");
const { analyticsPost } = require('../middlewares/validators');

module.exports = (app, express) => {
  const controller = require("../controllers/analytics.controller.js");
  var router = express.Router()

  // Create a new item
  router.post("/:key", analyticsPost, controller.create);

  // Retrieve all items
  router.get("/:key", [authJwt.verifyToken, authJwt.isAdmin], controller.index);

  app.use('/api/analytics', router);
};