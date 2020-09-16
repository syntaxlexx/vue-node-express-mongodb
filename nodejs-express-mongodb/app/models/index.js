const dbConfig = require("../../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.tutorials = require("./tutorial.model.js")(mongoose, mongoosePaginate);
db.user = require("./user.model")(mongoose, mongoosePaginate);
db.role = require("./role.model")(mongoose);

db.ROLES = ["user", "admin", "moderator", "sudo"];

module.exports = db;
