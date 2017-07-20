var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser'),
    RadiusServer = require('./lib/radius'),
    config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.mongoose.host + '/' + config.mongoose.database, {
    useMongoClient: true,
});


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'))


var routes = require('./api/routes/todoListRoutes');
routes(app);


app.listen(config.express.port);

console.log('todo list RESTful API server started on: ' + config.express.port);


var radius = RadiusServer.createServer({
    secret: config.radius.secret
});

radius.bind(config.radius.port, config.radius.address);
