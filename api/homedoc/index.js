'use strict';

var router = require('express').Router({ mergeParams: true });

module.exports = router;

router.get('/', function (req, res) {

    var db = req.db;
    console.log('dbss', db);

    var context = {};
    context.layout = null;
    context.exampleString = "Internauta";
    var template = __dirname + '/views/homedoc';

    res.set('Content-Type', 'application/vnd.uber+json');

    return res.status(200).render(template, context);
});
//# sourceMappingURL=index.js.map