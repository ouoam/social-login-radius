//edit from https://github.com/layeh/google-apps-radius/blob/master/lib/index.js
var dgram = require('dgram');
var radius = require('radius');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var authenticate;
module.exports.authenticate = authenticate = function (username, password, callback) {
    if (password == '') {
        callback(true);
        return;
    }

    User.find({
        user_name: username
    }, function (err, user) {
        if (err) {
            callback(err);
        }

        if (user[0] != null && (user[0]['pass'] == password || user[0]['at_hash'] == password)) {
            callback(null, {
                username: username,
                status: true,
            });
        } else {
            callback(true);
        }
    });
}

module.exports.createServer = function (options) {
    // Defaults
    if (!options) {
        options = {};
    }
    if (!options.protocol) {
        options.protocol = 'udp4';
    }

    // Create server
    var server = dgram.createSocket(options.protocol);

    // Register callback
    server.on('message', function (msg, rinfo) {
        try {
            var packet = radius.decode({
                packet: msg,
                secret: options.secret
            });
        } catch (ex) {
            server.emit('radius-error', {
                message: ex.toString()
            });
            return;
        }

        if (packet.code != 'Access-Request') {
            server.emit('radius-error', {
                message: 'Packet code error: not "Access-Request"'
            });
            return;
        }

        var username = packet.attributes['User-Name'];
        var password = packet.attributes['User-Password'];

        // Reply function
        authenticate(username, password, function (err, obj) {
            var code = !err && obj.status ? 'Access-Accept' : 'Access-Reject';
            var response = radius.encode_response({
                packet: packet,
                code: code,
                secret: options.secret
            });
            server.send(response, 0, response.length, rinfo.port, rinfo.address, function () {
                if (err) {
                    obj = {
                        username: username,
                        status: false,
                    };
                }
                server.emit('radius', obj);
            });
        });
    });

    server.on('listening', function () {
        var address = server.address();
        console.log(now() + 'Listening ' + address.address + ':' + address.port);
    });

    server.on('radius', function (e) {
        var type = e.status ? 'success' : 'failure';
        console.log(now() + 'Authentication ' + type + ': ' + e.username);
    });

    server.on('radius-error', function (err) {
        console.log(now() + err.message);
    });

    return server;
};

function now() {
    return new Date().toISOString() + ': ';
}
