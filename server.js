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
 * Socket.io configs
 */
var arr = [];
var players = {};
var player1;
var player2;
io.on('connection', function(socket){
  console.log('New user connected. ID: '+ socket.id);
  arr.push(socket.id);
  
  if(arr.length > 1) {
    io.emit('game-start');
    started = true;
    player1 = arr[0];
    player2 = arr[1];
    players[player1] = 'player1';
    players[player2] = 'player2';
    socket.emit('lock-turn');
  }
  if(arr.length <= 1) {
    io.emit('wait-players');
  }
  
  // console.log(arr);
  // console.log('Jogando sozinho: '+(arr.length<=1));

  socket.on('play-card', function(idCarta){
    var player = players[socket.id];
    console.log('Usuario: '+player+' utilizou a Carta: '+idCarta);
    if(game.hasResources(idCarta, player)) {
      var data = game.usarCarta(idCarta, player);
      socket.emit('update', data);
    } else {
      socket.emit('invalid', idCarta);
    }
  });

  socket.on('pass-turn', function() {
    var gameInfo = game.passaTurno(players[socket.id]);
    // console.log('Usuario: '+socket.id+' passou a vez.');
    // var index = arr.indexOf(socket.id);
    socket.emit('lock-turn');
    if(isPlayerOne(socket.id)) {
      io.to(player2).emit('play-turn');  
    } else {
      io.to(player1).emit('play-turn');
    }
    io.emit('update', gameInfo);
  });

  socket.on('disconnect', function() {
    console.log('User disconnected. ID: '+ socket.id);
    var index = arr.indexOf(socket.id);
    arr.splice(index, 1);
    if(arr.length <= 1) {
      io.emit('wait-players');
    }
  });
});

function isPlayerOne(id) {
  return id == player1;
}

/**
 * Server init
 */
const PORT = 8000;
server.listen(PORT, function () {
  console.log('Server listening on PORT', PORT);
});