$(function () {
    $("[data-toggle='tooltip']").tooltip();
    
    socket = io();

    $('#btnNewGame').click(function() {
        window.location.reload(false);
    });

    $('#btnPass').click(function() {
        console.log(socket.id)
        socket.emit('pass-turn', socket.id);
    });

    socket.on('game-start', function() {
        $('#wait-players').modal('hide');
    });

    socket.on('wait-players', function() {
        $('#wait-players').modal('show');
    });

    socket.on('play-turn', function() {
        $('#wait-turn').modal('hide');
    });

    socket.on('lock-turn', function() {
        $('#wait-turn').modal('show');
    });

    socket.on('update', function(data){
        console.log('Recebido:' + JSON.stringify(data));
        if(data != null) {
            for (var tar in data) {
                var target
                if (tar == 'player1') {
                    target = 'my-';
                } else {
                    target = 'enemy-';
                }
                console.log('Castelo '+tar+': ' + data[tar].stats.castle.valor);
                for (var item in data[tar].stats) {
                    var id = '#'+target+item;
                    $(id).text(data[tar].stats[item].valor);
                    
                    if(item == 'castle' || item == 'wall') {
                        var percent = $(id).width() / $(id).parent().width() * 100;
                        $(id).width(percent - (percent - data[tar].stats[item].valor) + '%');
                    }
                }
            }
            // TODO: Colocar a verificacao em um listener (doc ready)
            if($('#my-castle').text() >= 100 || $('#enemy-castle').text() <= 0) {
                $('#win-modal').modal();
            }
        }
    });
});

function playCard(btn) {
    var idCarta = $(btn).attr('for');
    console.log('btn: '+ $(btn) + ', id: '+ idCarta);
    socket.emit('play-card', idCarta);
    socket.on('invalid', function(){
        $(btn).popover('toggle');
         btn = null;
    });
   
}