const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/public'));


require('./server/routes')(app);
app.get('/', function (req, res) {
    res.sendfile('public/views/index.html', { root: __dirname + "/" });
});

// Route charts page
app.get('/charts.html', function (req, res) {
    res.sendfile('public/views/' + 'charts.html');
});

// Route inspirations page
app.get('/inspiration.html', function (req, res) {
    res.sendfile('public/views/' + 'inspiration.html');
});

module.exports = app;
