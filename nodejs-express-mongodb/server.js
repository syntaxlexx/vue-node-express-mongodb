const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(helmet());
const router = express.Router();

// const corsConfig = require('./config/cors.config');
var corsOptions = {
  origin: [
    "http://localhost:8081",
    "http://nodejslive.test",
    "https://eager-galileo-1369f9.netlify.app"
  ]
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const { seedDefaultData } = require('./config/db.config')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    seedDefaultData(db);
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

/**
 * log routes & time taken
 */
const { demoLogger } = require('./app/middlewares');
app.use(demoLogger);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our API application server." });
});

/**
 * App routes
 */
require("./app/routes/analytics.routes")(app, express);
require("./app/routes/turorial.routes")(app, express);
require("./app/routes/auth.routes")(app, express);
require("./app/routes/user.routes")(app, express);
require("./app/routes/role.routes")(app, express);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});