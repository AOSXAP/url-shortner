const database = require("../db/database");
const app = require("./app");
const db = new database();

module.exports = db;

db.start();
app.run();
