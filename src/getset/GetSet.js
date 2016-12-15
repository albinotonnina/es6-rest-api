var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

export class Routes {
    constructor() {
        this.dbCollection = 'mycollection';
    }

    root(req, res) {
        const context = {};
        context.layout = null;
        context.exampleString = 'sdfds';
        const template = __dirname + '/views/getset';

        res.set('Content-Type', 'application/vnd.uber+json');

        return res.status(200).render(template, context);
    }

    handleError(res, reason, message, code) {
        console.log('ERROR: ' + reason);
        return res.status(code || 500).json({'error': message});
    }

    getRecords(req, res) {
        const db = req.db;
        const collection = db.collection(this.dbCollection);

        collection.find({}).toArray(function (err, docs) {

            if (err) {
                return this.handleError(res, err.message, 'Failed to get contacts.');
            }

            return res.status(200).json(docs);
        });
    }

    getRecord(req, res) {
        const db = req.db;
        const collection = db.collection(this.dbCollection);

        collection.findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {

            if (err) {
                return this.handleError(res, err.message, 'Failed to get contact');
            }

            return res.status(200).json(doc);
        });
    }

    setRecord(req, res) {

        const db = req.db;
        const collection = db.collection(this.dbCollection);

        const newContact = req.body;
        newContact.createDate = new Date();

        if (!(req.body.firstName || req.body.lastName)) {
            return this.handleError(res, 'Invalid user input', 'Must provide a first or last name.', 400);
        }

        collection.insertOne(newContact, function (err, doc) {

            if (err) {
                return this.handleError(res, err.message, 'Failed to create new contact.');
            }

            return res.status(201).json(doc.ops[0]);

        });

    }
}
