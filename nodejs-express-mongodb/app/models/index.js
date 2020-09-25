const dbConfig = require("../../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.tutorials = require("./tutorial.model")(mongoose, mongoosePaginate);
db.users = require("./user.model")(mongoose, mongoosePaginate);
db.roles = require("./role.model")(mongoose);
db.traffic = require("./traffic.model")(mongoose, mongoosePaginate);
db.queries = require("./queries.model")(mongoose, mongoosePaginate);

db.DEFAULT_ROLES = ["user", "admin", "moderator", "sudo"];

module.exports = db;