import { version } from '../../package.json';
import { Router } from 'express';
import homedoc from './homedoc';
import getset from './getset';

export default ({ config, db }) => {
	let api = Router();

	// // mount the facets resource
	// api.use('/facets', facets({ config, db }));
    //
	// // perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

    api.use('/home', homedoc({ config, db }));
    api.use('/people', getset({ config, db }));


    //api.use('/', require('./homedoc'));
    // api.use('/getset', require('./getset'));
    // api.use('/scrape', require('./scraper'));





    return api;
}
