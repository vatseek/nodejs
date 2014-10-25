var User = require('models/user').User;
var HttpError = require('error').HttpError;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
    app.get('/', function (req, res, next) {
        res.render('index', {title: 'Hello worlds'});
    });

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            assert.equal(null, err);
            res.json(users);
        });
    });

    app.get('/users/:id', function (req, res, next) {
        try {
            var id = new ObjectID(req.params.id);
        } catch (e) {
            return next(404);
        }

        User.findById(id, function (err, user) {
            assert.equal(null, err);
            if (!user) {
                console.log('1232');
                next(new HttpError(404, 'User not found'));

                return;
            }

            res.json(user);
        });
    });
}