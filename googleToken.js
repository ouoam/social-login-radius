var config = require('./config');

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(config.CLIENT_ID, '', '');

module.exports = function(token) {
    client.verifyIdToken(
        token,
        config.CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
            var payload = login.getPayload();
            var userid = payload['sub'];
            var domain = payload['hd'];
            console.log(payload);
        }
    );
}