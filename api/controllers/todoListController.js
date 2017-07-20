'use strict';


var mongoose = require('mongoose');

/*
    Task.findById(req.params.taskId, function(err, task) {

    Task.remove({_id: req.params.taskId}, function(err, task) {
*/

var User = mongoose.model('User');
var googleCheckToken = require('../../lib/googleToken');

exports.update_user = function (req, res) {
    googleCheckToken(req.body['idtoken'], function (err, data) {
        if (err)
            res.send(err);

        User.find({
            sub: data['sub']
        }, function (err, user) {
            if (err)
                res.send(err);

            if (user[0] == null) {
                var new_user = new User(data);
                new_user.save(function (err, user) {
                    if (err)
                        res.send(err);
                    res.json({
                        status: 'ok'
                    });
                });
            } else {
                data['pass'] = user[0]['pass'];
                User.findOneAndUpdate({
                        _id: user[0]['_id']
                    }, data, {
                        new: true
                    },
                    function (err, user) {
                        if (err)
                            res.send(err);
                        res.json({
                            status: 'ok'
                        });
                    }
                );
            }
        });
    });
};
