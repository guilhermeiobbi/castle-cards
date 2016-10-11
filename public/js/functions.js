$(function () {
  $("[data-toggle='tooltip']").tooltip();

  $('#btnNewGame').click(function() {
      window.location.reload(false);
  });

  socket = io();
  $('form').submit(function(){
      var idCarta = $(this).attr('id');
      socket.emit('update', idCarta);
      return false;
  });

  socket.on('update', function(data){
      console.log('Recebido:' + JSON.stringify(data));
      if(data != null) {
        for (var item in data) {
          var id = '#'+item;
          $(id).text(data[item]);

          if(item == 'myCastle' || item == 'enemyCastle' || item == 'myWall' || item == 'enemyWall') {
            var percent = $(id).width() / $(id).parent().width() * 100;
            $(id).width(percent - (percent - data[item]) + '%');
          }
        }
        // TODO: Colocar a verificacao em um listener (doc ready)
        if($('#myCastle').text() >= 100 || $('#enemyCastle').text() <= 0) {
          $('#winModal').modal();
        }
      }
  });
});