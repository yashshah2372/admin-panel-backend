const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const cors = require('cors');
 



//for swagger documentation


//cors error resolving
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })


    app.use(cors({
        origin: '*'
    }));

//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//cookies and file middleware
app.use(cookieParser());
//this is very important
app.use(fileUpload({
    //useTempFiles: true,
    //tempFileDir: "/tmp/"
}));
 

//morgan middleware
app.use(morgan('tiny'))



//import all routes here
const home = require('./routes/home');
const project = require('./routes/project');
const user = require('./routes/user');



//router middleware
app.use("/api/v1", home);
app.use("/api/v1", project);
app.use("/api/v1", user);

//export app js
module.exports = app;
