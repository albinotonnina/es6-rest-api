'use strict';

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _GetSet = require('./GetSet');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router({ mergeParams: true });
var routes = new _GetSet.Routes();

_underscore2.default.bindAll(routes, 'root', 'getRecords', 'getRecord', 'setRecord');

module.exports = router;

router.get('/', routes.root);
router.get('/getter', routes.getRecords);
router.get('/getter/:id', routes.getRecord);
router.post('/setter', routes.setRecord);
//# sourceMappingURL=index.js.map