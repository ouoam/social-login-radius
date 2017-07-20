var config = require('./config');

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(config.CLIENT_ID, '', '');

module.exports = function(token, callback) {
    var data = {};

    client.verifyIdToken(
        token,
        config.CLIENT_ID,

        function(e, login) {
            if (e) {
                console.log('Token error!!!');
                return false;
            }

            var payload = login.getPayload();
            var userid = payload['sub'];

            if (payload['hd'] != config.host_domain) {
                console.log('Domain error!!!');
                return false;
            }

            data['sub'] = payload['sub'];
            data['user_name'] = payload['email'].split("@")[0];
            data['pass'] = '';
            data['at_hash'] = payload['at_hash'];
            data['first'] = payload['given_name'];
            data['last'] = payload['family_name'];
            data['locale'] = payload['locale'];
            data['picture'] = payload['picture'];

            callback(data);
        }
    );
}