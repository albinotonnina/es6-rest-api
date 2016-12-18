'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _homedoc = require('./homedoc');

var _homedoc2 = _interopRequireDefault(_homedoc);

var _getset = require('./getset');

var _getset2 = _interopRequireDefault(_getset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
   var config = _ref.config,
       db = _ref.db;

   var api = (0, _express.Router)();

   // // mount the facets resource
   // api.use('/facets', facets({ config, db }));
   //
   // // perhaps expose some API metadata at the root
   api.get('/', function (req, res) {
      res.json({ version: _package.version });
   });

   api.use('/home', (0, _homedoc2.default)({ config: config, db: db }));
   api.use('/people', (0, _getset2.default)({ config: config, db: db }));

   //api.use('/', require('./homedoc'));
   // api.use('/getset', require('./getset'));
   // api.use('/scrape', require('./scraper'));


   return api;
};
//# sourceMappingURL=index.js.map