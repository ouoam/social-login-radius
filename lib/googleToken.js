var config = require('./../config');

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(config.google.CLIENT_ID, '', '');

module.exports = function (token, callback) {
    client.verifyIdToken(
        token,
        config.google.CLIENT_ID,

        function (e, login) {
            if (e) {
                console.log('Token error!!!');
                callback('Token error');
            }

            var payload = login.getPayload();

            if (payload['hd'] != config.google.host_domain) {
                console.log('Domain error!!!');
                callback('Domain error');
            }

            var data = {};
            data['sub'] = payload['sub'];
            data['user_name'] = payload['email'].split("@")[0];
            data['pass'] = '';
            data['at_hash'] = payload['at_hash'];
            data['first'] = payload['given_name'];
            data['last'] = payload['family_name'];
            data['locale'] = payload['locale'];
            data['picture'] = payload['picture'];

            callback(null, data);
        }
    );
}
