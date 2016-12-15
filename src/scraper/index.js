var router = require('express').Router({ mergeParams: true });

import {Scraper} from './Scraper'

module.exports = router;

router.get('/', function(req, res) {

    const scraper = new Scraper();

    scraper.getTotalPages().then((output)=>{

        let totalPages = output.pages;
        // let totalPages = 1; //debug

        scraper.getPagesExercises(totalPages).then((output)=>{
            res.status(200).send(JSON.stringify(output));
        });
    });

});
