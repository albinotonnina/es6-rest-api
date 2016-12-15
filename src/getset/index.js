import _ from 'underscore';
import {Routes} from './GetSet';
import Router from 'express';

const router = Router.Router({mergeParams: true});
const routes = new Routes();

_.bindAll(routes, 'root', 'getRecords', 'getRecord', 'setRecord');

module.exports = router;

router.get('/', routes.root);
router.get('/getter', routes.getRecords);
router.get('/getter/:id', routes.getRecord);
router.post('/setter', routes.setRecord);
