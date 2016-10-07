/**
 * Lib imports
 */
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

/**
 * Local APIs
 */
var api   = require('./routes/api');
var index = require('./routes/index');

/**
 * JSON support definitions
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Pug 
 */
app.set('view engine', 'pug');

/**
 * Routes
 */
app.use('/', index);
app.use('/api', api);

/**
 * Including static folders and files
 */
app.use('/static', express.static(__dirname + '/public'));

/**
 * Server init
 */
const PORT = 8000;

app.listen(PORT, function () {
  console.log('Server listening on PORT', PORT);
});