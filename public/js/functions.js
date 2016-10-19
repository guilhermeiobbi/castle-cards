$(function () {
    $("[data-toggle='tooltip']").tooltip();
    
    socket = io();

    $('#btnNewGame').click(function() {
        window.location.reload(false);
    });

    $('#btn-pass-player1').click(function() {
        socket.emit('pass-turn', socket.id);
    });

    $('#btn-pass-player2').click(function() {
        socket.emit('pass-turn', socket.id);
    });

    socket.on('wait-game', function() {
        $('#wait-game').modal('show');
    });

    socket.on('game-start', function(data) {
        $('.modal').modal('hide');
        if(data != null) {
            $('#lbl-'+data.me).text('Você');
            $('#lbl-'+data.enemy).text('Oponente');
            $('#btn-pass-'+data.me).removeClass('hidden');
        }
    });

    socket.on('wait-players', function() {
        $('#wait-players').modal('show');
    });

    socket.on('play-turn', function() {
        $('#wait-turn').modal('hide');
    });

    socket.on('lock-turn', function(data) {
        $('#wait-turn').modal('show');
        if(data != null) {
            $('#lbl-'+data.me).text('Você');
            $('#lbl-'+data.enemy).text('Oponente');
            $('#btn-pass-'+data.me).removeClass('hidden');
        }
    });

    socket.on('you-win', function() {
        $('#win-modal').modal();
    });

    socket.on('you-lose', function() {
        $('#wait-turn').modal('hide');
        $('#lose-modal').modal();
    });

    socket.on('update', function(data){
        if(data != null) {
            for (var tar in data) {
                var target
                if (tar == 'player1') {
                    target = 'my-';
                } else {
                    target = 'enemy-';
                }
                for (var item in data[tar].stats) {
                    var id = '#'+target+item;
                    $(id).text(data[tar].stats[item].valor);
                    
                    if(item == 'castelo' || item == 'muro') {
                        var percent = $(id).width() / $(id).parent().width() * 100;
                        $(id).width(percent - (percent - data[tar].stats[item].valor) + '%');
                    }
                }
            }
        }
    });

});

function playCard(btn) {
    $(btn).attr('disabled', 'disabled');
    var idCarta = $(btn).attr('for');
    var idComponent = $(btn).attr('id');
    socket.emit('play-card', idCarta);
    socket.on('invalid', function(){
        $(btn).popover('toggle');
        btn = null;
        return;
    });
    
    socket.on('new-card', function(data) {
        $('#div'+idComponent).fadeOut(900, function() {
            $('#cartas').append(data).fadeIn(900);
            $('#div'+idComponent).remove();
        });
        socket.emit('pass-turn', socket.id);
    });
}