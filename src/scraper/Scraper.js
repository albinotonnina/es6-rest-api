var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');


export class Scraper {

    constructor() {
        this.url = 'http://db.everkinetic.com';

        this.rpOptions = {
            uri: this.url,
            simple: true,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
    }


    getTotalPages() {
        return new Promise((resolve) => {
            rp(this.rpOptions)
                .then(($) => {
                    resolve({
                        pages: Number($('.page-numbers').not('.next').last().text())
                    });
                })
        });

    }

    getPagesExercises(pages) {

        let pagePromises = [];


        for (let i = 0; i < pages; i++) {
            pagePromises.push(this.getExercisesForPage(i))
        }

        return Promise.all(pagePromises).then(values => {
            const exercisesUrls = values.reduce((a, b) => a.concat(b), []);
            return this.scrapeExercises(exercisesUrls);
        });

    }


    getExercisesForPage(pageNum) {

        this.rpOptions.url = `${this.url}/page/${pageNum}`;

        return new Promise((resolve, reject) => {
            rp(this.rpOptions)
                .then(($) => {
                    let pageExercisesUrls = [];
                    $('article').each(function (i) {
                        pageExercisesUrls[i] = $(this).find('h3').find('a').attr('href');
                    });
                    resolve(pageExercisesUrls);
                })
                .catch(function () {
                    reject()
                });

        });

    }

    scrapeExercises(exerciseUrls) {
        let exercisePromises = [];

        for (let i = 0; i < exerciseUrls.length; i++) {
            exercisePromises.push(this.scrapeExercise(exerciseUrls[i]));
        }

        return Promise.all(exercisePromises).then(values => {
            return values;
        });

    }

    scrapeExercise(exerciseUrl) {
        return new Promise((resolve, reject) => {
            rp({
                uri: exerciseUrl,
                transform: function (body) {
                    return cheerio.load(body);
                }
            })
                .then(($) => {
                    resolve(this.grabExerciseData($));
                })
                .catch(function () {
                    reject()
                });
        });
    }

    grabExerciseData($) {
        const exerciseObject = {};

        exerciseObject.title = this.getExerciseTitle($);
        exerciseObject.description = this.getExerciseDescription($);
        exerciseObject.taxonomies = this.getExerciseTaxonomies($);
        exerciseObject.steps = this.getExerciseSteps($);

        return exerciseObject;
    }

    getExerciseTitle($) {
        return $('.entry-title').find('a').text();
    }

    getExerciseDescription($) {
        return $('.exercise-entry-content').children().first().text();
    }

    getExerciseTaxonomies($) {
        const texonomies = {};

        $('.exercise-taxonomies').children().each((index, element) => {
            const splitFields = $(element).find('a').attr('href').replace(`${this.url}/`, '').split('/');
            texonomies[splitFields[0]] = splitFields[1];
        });

        return texonomies;
    }

    getExerciseSteps($) {

        let steps = [];

        $('.exercise-entry-content').find('ol').children().each((index, element) => {
            steps.push($(element).text())
        });

        return steps;
    }


}
