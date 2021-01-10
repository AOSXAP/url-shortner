const mongoose = require("mongoose");
const { clusteruser, link } = require("../config.json");;

mongoose.connect(`${link}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        autoIndex: false
    }  
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.on('open', () => {
    console.log(`Connected to MongoDB as ${clusteruser}`);
});