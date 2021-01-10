const express = require("express");
const chalk = require("chalk");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../main/startup");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.use(express.static(path.join(__dirname, "..", "public")));

router.get("/", (req, res) => {
  res.render("./logIn/login.ejs");
});

router.post('/', async(req,res) => {
    const {email , password} = req.body;
    const user = await db.finduser(email);
    if(user!=false) {
      var userx = JSON.stringify(user);
       (user.pass == password ? res.redirect('/login/dashboard/' + user._id): res.send("bad req"));
    } else {
        console.log(false);
    }
})

router.get('/dashboard/:id' , async (req,res) => {
  let id = req.params.id;

   const user = await db.finduserid(id);

   const posts = await db.listofuserlinks(id);

   const userx = JSON.stringify(user);

   res.render('./dashboard.ejs', {user, posts})
})

router.post('/dashboard/:id', async (req,res) => {
  const auth = [req.body.link, req.params.id, req.body.link_name];
  const redirect = () => {
    res.redirect("/login/dashboard/" + auth[1]);
  }


  const del = req.body.delete;

  const {newname,orname} = req.body;

  if(orname){
    db.editname(orname,newname);
    redirect();
  }


  if (del){db.deleteurlbyname(del);
  redirect();
  }

  if(auth[0]){
      const link = db.adduserurl(auth[0], auth[1], auth[2]);

      if (link == true) {
        redirect();
      }

  }


})

module.exports = router;