const { tutorialsCrud } = require('../middlewares/validation-middleware');

module.exports = (app, express) => {
    const controller = require("../controllers/tutorial.controller.js");
    var router = express.Router()

    // Create a new item
    router.post("/", tutorialsCrud, controller.create);

    // Retrieve all items
    router.get("/", controller.index);

    // Retrieve all published items
    router.get("/published", controller.findAllPublished);

    // Retrieve a single item with id
    router.get("/:id", controller.show);

    // Update a item with id
    router.put("/:id", tutorialsCrud, controller.update);

    // delete all items
    router.delete("/", controller.deleteAll);

    // Delete an item  with id
    router.delete("/:id", controller.delete);

    app.use('/api/tutorials', router);
};