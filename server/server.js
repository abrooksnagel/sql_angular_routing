/**
 * Created by abrooksnagel on 1/22/16.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');


app.use(bodyParser.json());


app.use(express.static('server/public'));
app.use('/api', api);
app.use('/', index);


var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Listening on port', port);
});