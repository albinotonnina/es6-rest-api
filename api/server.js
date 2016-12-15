"use strict";

require('dotenv').config();

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
// var ObjectID = mongodb.ObjectID;

// var CONTACTS_COLLECTION = "contacts";

var app = express();
var db;

app.disable("x-powered-by");
app.set('view engine', 'handlebars');
app.engine('handlebars', require('hbs').__express);

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/', require('./homedoc'));
app.use('/getset', require('./getset'));
app.use('/scrape', require('./scraper'));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 3000, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});
//# sourceMappingURL=server.js.map