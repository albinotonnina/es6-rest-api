import { Router } from 'express';

export default ({ config, db }) => {
    let routes = Router();

    // add middleware here
    // console.log('routes',routes);
    // console.log('config',config);
    // console.log('db',db);

    return routes;
}
