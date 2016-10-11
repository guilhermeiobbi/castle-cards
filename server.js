/**
 * Lib imports
 */
var bodyParser = require('body-parser');
var express    = require('express');
var app        = express();
var server     = require('http').Server(app);
var io         = require('socket.io')(server);

/**
 * Local APIs
 */
var api   = require('./routes/api');
var index = require('./routes/index');
var game  = require('./routes/services/game');

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
 * Socket.io config
 */
io.on('connection', function(socket){
  console.log('new user connected');
  socket.on('update', function(idCarta){
    console.log('Recebido (server.js): ' + idCarta);
    var data = game.usarCarta(idCarta);
    io.emit('update', data);
  });
});

/**
 * Server init
 */
const PORT = 8000;
server.listen(PORT, function () {
  console.log('Server listening on PORT', PORT);
});