'use strict';

var _Scraper = require('./Scraper');

var router = require('express').Router({ mergeParams: true });

module.exports = router;

router.get('/', function (req, res) {

    var scraper = new _Scraper.Scraper();

    scraper.getTotalPages().then(function (output) {

        var totalPages = output.pages;
        // let totalPages = 1; //debug

        scraper.getPagesExercises(totalPages).then(function (output) {
            res.status(200).send(JSON.stringify(output));
        });
    });
});
//# sourceMappingURL=index.js.map