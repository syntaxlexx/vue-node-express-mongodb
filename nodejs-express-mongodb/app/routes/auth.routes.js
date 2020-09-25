const { signIn, signup } = require('../middlewares/validators');
const controller = require("../controllers/auth.controller");

module.exports = function(app, express) {
  var router = express.Router()

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", signup, controller.signup);

  app.post("/api/auth/signin", signIn, controller.signin);
};