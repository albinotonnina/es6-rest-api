'use strict';

var _Scraper = require('./Scraper');

var router = require('express').Router({ mergeParams: true });

module.exports = router;

router.get('/', function (req, res) {

    var scraper = new _Scraper.Scraper();

    scraper.crawl().then(function (output) {
        res.status(200).send(JSON.stringify(output));
    }).catch(function (errCode) {
        res.status(500).send(JSON.stringify({ error: errCode }));
    });
});
//# sourceMappingURL=index.js.map