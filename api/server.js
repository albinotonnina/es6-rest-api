'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// 3rd party middleware
app.use((0, _cors2.default)({
    exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyLimit
}));

app.disable("x-powered-by");
app.set('view engine', 'handlebars');
app.engine('handlebars', require('hbs').__express);
app.use('/assets', _express2.default.static(_path2.default.join(__dirname, '../assets')));
app.use(_bodyParser2.default.json()); // for parsing application/json
app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// connect to db
(0, _db2.default)(function (db) {

    // // internal middleware
    app.use((0, _middleware2.default)({ config: _config2.default, db: db }));

    //     app.use('/', require('./homedoc'));
    // app.use('/getset', require('./getset'));
    // app.use('/scrape', require('./scraper'));
    //

    //
    // // api router
    app.use('/api', (0, _api2.default)({ config: _config2.default, db: db }));
    //
    app.server.listen(process.env.PORT || _config2.default.port);
    //
    console.log('Started on port ' + app.server.address().port);
});

exports.default = app;

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
//# sourceMappingURL=server.js.map