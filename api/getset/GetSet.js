'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var Routes = exports.Routes = function () {
    function Routes() {
        _classCallCheck(this, Routes);

        this.dbCollection = 'mycollection';
    }

    _createClass(Routes, [{
        key: 'root',
        value: function root(req, res) {
            var context = {};
            context.layout = null;
            context.exampleString = 'sdfds';
            var template = __dirname + '/views/getset';

            res.set('Content-Type', 'application/vnd.uber+json');

            return res.status(200).render(template, context);
        }
    }, {
        key: 'handleError',
        value: function handleError(res, reason, message, code) {
            console.log('ERROR: ' + reason);
            return res.status(code || 500).json({ 'error': message });
        }
    }, {
        key: 'getRecords',
        value: function getRecords(req, res) {
            var db = req.db;
            var collection = db.collection(this.dbCollection);

            collection.find({}).toArray(function (err, docs) {

                if (err) {
                    return this.handleError(res, err.message, 'Failed to get contacts.');
                }

                return res.status(200).json(docs);
            });
        }
    }, {
        key: 'getRecord',
        value: function getRecord(req, res) {
            var db = req.db;
            var collection = db.collection(this.dbCollection);

            collection.findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {

                if (err) {
                    return this.handleError(res, err.message, 'Failed to get contact');
                }

                return res.status(200).json(doc);
            });
        }
    }, {
        key: 'setRecord',
        value: function setRecord(req, res) {

            var db = req.db;
            var collection = db.collection(this.dbCollection);

            var newContact = req.body;
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
    }]);

    return Routes;
}();
//# sourceMappingURL=GetSet.js.map