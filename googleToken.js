var config = require('./config');

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(config.CLIENT_ID, '', '');

module.exports = function (token) {
    client.verifyIdToken(
        token,
        config.CLIENT_ID,

        function (e, login) {
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
            console.log(payload);
        }
    );
}