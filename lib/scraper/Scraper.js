'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

var Scraper = exports.Scraper = function () {
    function Scraper() {
        _classCallCheck(this, Scraper);

        this.url = 'http://db.everkinetic.com';

        this.rpOptions = {
            uri: this.url,
            simple: true,
            transform: function transform(body) {
                return cheerio.load(body);
            }
        };
    }

    _createClass(Scraper, [{
        key: 'getTotalPages',
        value: function getTotalPages() {
            var _this = this;

            return new Promise(function (resolve) {
                rp(_this.rpOptions).then(function ($) {
                    resolve({
                        pages: Number($('.page-numbers').not('.next').last().text())
                    });
                });
            });
        }
    }, {
        key: 'getPagesExercises',
        value: function getPagesExercises(pages) {
            var _this2 = this;

            var pagePromises = [];

            for (var i = 0; i < pages; i++) {
                pagePromises.push(this.getExercisesForPage(i));
            }

            return Promise.all(pagePromises).then(function (values) {
                var exercisesUrls = values.reduce(function (a, b) {
                    return a.concat(b);
                }, []);
                return _this2.scrapeExercises(exercisesUrls);
            });
        }
    }, {
        key: 'getExercisesForPage',
        value: function getExercisesForPage(pageNum) {
            var _this3 = this;

            this.rpOptions.url = this.url + '/page/' + pageNum;

            return new Promise(function (resolve, reject) {
                rp(_this3.rpOptions).then(function ($) {
                    var pageExercisesUrls = [];
                    $('article').each(function (i) {
                        pageExercisesUrls[i] = $(this).find('h3').find('a').attr('href');
                    });
                    resolve(pageExercisesUrls);
                }).catch(function () {
                    reject();
                });
            });
        }
    }, {
        key: 'scrapeExercises',
        value: function scrapeExercises(exerciseUrls) {
            var exercisePromises = [];

            for (var i = 0; i < exerciseUrls.length; i++) {
                exercisePromises.push(this.scrapeExercise(exerciseUrls[i]));
            }

            return Promise.all(exercisePromises).then(function (values) {
                return values;
            });
        }
    }, {
        key: 'scrapeExercise',
        value: function scrapeExercise(exerciseUrl) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                rp({
                    uri: exerciseUrl,
                    transform: function transform(body) {
                        return cheerio.load(body);
                    }
                }).then(function ($) {
                    resolve(_this4.grabExerciseData($));
                }).catch(function () {
                    reject();
                });
            });
        }
    }, {
        key: 'grabExerciseData',
        value: function grabExerciseData($) {
            var exerciseObject = {};

            exerciseObject.title = this.getExerciseTitle($);
            exerciseObject.description = this.getExerciseDescription($);
            exerciseObject.taxonomies = this.getExerciseTaxonomies($);
            exerciseObject.steps = this.getExerciseSteps($);

            return exerciseObject;
        }
    }, {
        key: 'getExerciseTitle',
        value: function getExerciseTitle($) {
            return $('.entry-title').find('a').text();
        }
    }, {
        key: 'getExerciseDescription',
        value: function getExerciseDescription($) {
            return $('.exercise-entry-content').children().first().text();
        }
    }, {
        key: 'getExerciseTaxonomies',
        value: function getExerciseTaxonomies($) {
            var _this5 = this;

            var texonomies = {};

            $('.exercise-taxonomies').children().each(function (index, element) {
                var splitFields = $(element).find('a').attr('href').replace(_this5.url + '/', '').split('/');
                texonomies[splitFields[0]] = splitFields[1];
            });

            return texonomies;
        }
    }, {
        key: 'getExerciseSteps',
        value: function getExerciseSteps($) {

            var steps = [];

            $('.exercise-entry-content').find('ol').children().each(function (index, element) {
                steps.push($(element).text());
            });

            return steps;
        }
    }]);

    return Scraper;
}();
//# sourceMappingURL=Scraper.js.map