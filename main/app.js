const express = require('express');
const chalk = require('chalk');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const path = require("path");

module.exports.run = () => {

    const app = express();

    //body-parser, styling and view engine
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(express.static(path.join(__dirname, '..' ,"public")));

    app.set('view engine', ejs);


    //Home

    app.get('/', (req,res) => {
        res.render('Home.ejs');
    })

    //Log In

    const login = require('../routes/LogIn.js');

    app.use('/login' , login);

    //Sign In 
    const signin = require('../routes/Signin.js');

    app.use('/signin', signin);

    //URLS

    const urls = require('../routes/urls.js');

    app.use('/urls', urls);


    //404

    app.use('/', (req,res) => {
        res.render('404.ejs');
    })


    app.listen(3000 , (err) => {
        if(!err){
            console.log(chalk.blue("Server Started"));
        }else{
            console.log(chalk.red(err));
        }
    })
}