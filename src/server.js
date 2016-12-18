require('dotenv').config();

import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
    limit: config.bodyLimit
}));

app.disable("x-powered-by");
app.set('view engine', 'handlebars');
app.engine('handlebars', require('hbs').__express);
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// connect to db
initializeDb(db => {


    // // internal middleware
    app.use(middleware({config, db}));

//     app.use('/', require('./homedoc'));
// app.use('/getset', require('./getset'));
// app.use('/scrape', require('./scraper'));
//

    //
    // // api router
    app.use('/api', api({config, db}));
    //
    app.server.listen(process.env.PORT || config.port);
    //
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;

//
//
//
// var express = require("express");
// var path = require("path");
// var bodyParser = require("body-parser");
// var mongodb = require("mongodb");
//
// var app = express();
// var db;
//
//
// app.disable("x-powered-by");
// app.set('view engine', 'handlebars');
// app.engine('handlebars', require('hbs').__express);
//
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });
//
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//
//
// app.use('/', require('./homedoc'));
// app.use('/getset', require('./getset'));
// app.use('/scrape', require('./scraper'));
// app.use('/assets', express.static(path.join(__dirname, '../assets')));
//
// mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
//     if (err) {
//         console.log(err);
//         process.exit(1);
//     }
//
//     // Save database object from the callback for reuse.
//     db = database;
//     console.log("Database connection ready");
//
//
//     // Initialize the app.
//     var server = app.listen(process.env.PORT || 3000, function () {
//         var port = server.address().port;
//         console.log("App now running on port", port);
//     });
// });
