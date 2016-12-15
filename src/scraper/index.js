var router = require('express').Router({mergeParams: true});

import {Scraper} from './Scraper';

module.exports = router;

router.get('/', function (req, res) {

    const scraper = new Scraper();

    scraper.crawl()
        .then((output) => {
            res.status(200).send(JSON.stringify(output));
        })
        .catch((errCode)=>{
            res.status(500).send(JSON.stringify({error: errCode}));
        })

});
