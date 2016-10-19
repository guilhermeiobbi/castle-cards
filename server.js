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
var gameService  = require('./routes/services/GameService');

/**
 * JSON support definitions
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Pug settings
 */
app.set('view engine', 'pug');
var pug = require('pug');
var geraComponenteCarta = pug.compileFile('views/cards.pug');

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
    player1 = arr[0];
    player2 = arr[1];
    
    players[player1] = 'player1';
    players[player2] = 'player2';
    
    io.to(player1).emit('game-start', {'me': 'player1', 'enemy': 'player2'});
    socket.emit('lock-turn', {'me': 'player2', 'enemy': 'player1'});
  }
  if(arr.length <= 1) {
    io.emit('wait-players');
  }
  
  socket.on('play-card', function(idCarta){
    var player = players[socket.id];
    if(gameService.hasResources(idCarta, player)) {
      var data = gameService.usarCarta(idCarta, player);

      if(gameService.hasAWinner()) {
        if(gameService.isPlayerOneWinner()) {
          io.to(player1).emit('you-win');
          io.to(player2).emit('you-lose');
        } else {
          io.to(player1).emit('you-lose');
          io.to(player2).emit('you-win');
        }
        return;
      }
      
      var novaCarta = gameService.pegarNovaCarta();
      var obj = {cards: JSON.parse(JSON.stringify(novaCarta))};
      socket.emit('new-card', geraComponenteCarta(obj));
      
      socket.emit('update', data);

    } else {
      console.log('Jogador '+player+' sem recursos para a carta.');
      socket.emit('invalid', idCarta);
    }
  });

  socket.on('pass-turn', function() {
    var gameInfo = gameService.passaTurno(players[socket.id]);
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
app.set('port', (process.env.PORT || 8000));

server.listen(app.get('port'), function () {
  console.log('Server listening on PORT', app.get('port'));
});