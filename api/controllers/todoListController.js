'use strict';


var mongoose = require('mongoose');

/*
    Task = mongoose.model('Tasks');

    Task.find({}, function(err, task) {

    var new_task = new Task(req.body);
    new_task.save(function(err, task) {

    Task.findById(req.params.taskId, function(err, task) {

    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function(err, task) {

    Task.remove({_id: req.params.taskId}, function(err, task) {

*/

var User = mongoose.model('User');
var googleCheckToken = require('../../googleToken');

exports.update_user = function(req, res) {
    googleCheckToken(req.body['idtoken'], function(data) {
        User.find({ sub: data['sub'] }, function(err, user) {
            if (err)
                res.send(err);

            if (user[0] == null) {
                var new_user = new User(data);
                new_user.save(function(err, user) {
                    if (err)
                        res.send(err);
                    res.json({ status: 'ok' });
                });
            } else {
                User.findOneAndUpdate({ _id: user[0]['_id'] }, data, { new: true },
                    function(err, user) {
                        if (err)
                            res.send(err);
                        res.json({ status: 'ok' });
                    }
                );
            }
        });
    });
};