const express = require("express");
const chalk = require("chalk");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../main/startup");

const router = express.Router();

router.use(express.static(path.join(__dirname, '..',"public")));


router.get("/", (req, res) => {
  res.render("./signIn/add.ejs");
});

router.post("/", async (req, res) => {

  const { password, email, name } = req.body;
  console.log(password, email, name);

  if (!(await db.existinguser(email))) {

    db.createnewuser(email, password, name);
    res.redirect("/signin/user_created");

  } else {

    console.log("user already exists");
    res.redirect("/signin/user_exists");

  }
});

router.get("/user_exists", (req, res) => {
  res.render("./signIn/userExists.ejs");
});

router.get("/user_created", (req, res) => {
  res.render("./signIn/userCreated.ejs");
});

router.get("/user_exists", (req, res) => {
  res.render("");
});

module.exports = router;