module.exports = (app, express) => {
    const controller = require("../controllers/role.controller.js");
    var router = express.Router()

    // Create new
    router.post("/", controller.create);

    // Retrieve all
    router.get("/", controller.index);

    // Retrieve a single item with id
    router.get("/:id", controller.show);

    // Update an item with id
    router.put("/:id", controller.update);

    // delete all items
    router.delete("/", controller.deleteAll);

    // Delete an item with id
    router.delete("/:id", controller.delete);

    app.use('/api/roles', router);
};