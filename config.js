var config = {};

config.google = {};
config.google.CLIENT_ID = '1056275747245-4unpk681ffd3upkbvfnrv43jaecrglqi.apps.googleusercontent.com';
config.google.host_domain = 'pccpl.ac.th';

config.radius = {};
config.radius.secret = 'pccpl';
config.radius.port = 1812;
config.radius.address = '0.0.0.0';

config.express = {};
config.express.port = 3000;

config.mongoose = {};
config.mongoose.host = 'localhost';
config.mongoose.database = 'Tododb';

module.exports = config;
