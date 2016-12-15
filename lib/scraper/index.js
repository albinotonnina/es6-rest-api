'use strict';

var _Scraper = require('./Scraper');

var router = require('express').Router({ mergeParams: true });
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = router;

router.get('/', function (req, res) {

    var scraperObj = new _Scraper.Scraper();

    console.log(scraperObj);

    // Let's scrape Anchorman 2
    var url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title: "", release: "", rating: "" };

            $('.title_wrapper').filter(function () {
                var data = $(this);
                title = data.children().first().text().trim();
                release = data.children().last().children().last().text().trim();

                json.title = title;
                json.release = release;
            });

            $('.ratingValue').filter(function () {
                var data = $(this);
                rating = data.text().trim();

                json.rating = rating;
            });
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
            console.log('File successfully written! - Check your project directory for the output.json file', err);
        });

        return res.send('Check your console!');
    });

    return false;
    //
    // var context = {};
    // context.layout = null;
    //
    // context.title = "API Response Home Document";
    // context.external_api_url = "http://api.froyo.io";
    //
    // context.base_url = require("config").app.base_url || req.protocol + "://" + req.headers.host;
    //
    //
    // var template = __dirname + '/views/homedoc';
    //
    // res.set('Content-Type', 'application/vnd.uber+json');
    //
    // return res.status(200).render(template, context);
});
//# sourceMappingURL=index.js.map