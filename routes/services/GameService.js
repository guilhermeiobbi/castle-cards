var jsonCards = require('../cards/all-cards').cards;

function Stats() {
    this.muro = {nome: 'Muro', valor: 0};
    this.castelo = {nome: 'Castelo', valor: 50};
    this.magos = {nome: 'Mago', valor: 1},
    this.cristais = {nome: 'Cristal', valor: 50},
    this.soldados = {nome: 'Soldado', valor: 1},
    this.armas = {nome: 'Armas', valor: 50},
    this.construtores = {nome: 'Construtor', valor: 1},
    this.tijolos = {nome: 'Tijolo', valor: 50},
    this.producao = 'normal'
    return this;
}

var game = {
    player1: {}, 
    player2: {}
};

function getCarta(id) {
    var keys = Object.keys(jsonCards);
    for(i = 0; i < keys.length; i++) {
        var nomeCarta = keys[i];
        var carta = jsonCards[nomeCarta];
        if(carta.id == id) {
            console.log('Carta utilizada: ' + carta.nome);
            return carta;
        }
    }
}

function preparaTurno(player) {
    if(player.producao == 'normal') {
        player.cristais.valor += player.magos.valor;
        player.tijolos.valor  += player.construtores.valor;
        player.armas.valor    += player.soldados.valor;
    } else {
        player[player.producao].valor += player.magos.valor + player.construtores.valor + player.soldados.valor;
        player.producao = 'normal';
    }
}

function pagarCusto(custo, custo_qtd, player) {
    game[player].stats[custo].valor -= custo_qtd;
}

function logaOperacao(custo, custo_qtd, player, carta) {
    console.log('O '+player+' pagou: ' +custo_qtd+' '+custo+' pela carta \''+carta.nome+'\'.');
}

module.exports = {
    initializeVars: function(){
        arr = [];

        game.player1.stats = new Stats();
        game.player2.stats = new Stats();
        
        preparaTurno(game.player1.stats);

        arr.push(JSON.stringify(game));

        return arr;
    },

    hasResources: function (id, player) {
        
        var carta = getCarta(id);

        if(carta.custo instanceof Object) {
            var size = Object.keys(carta.custo).length;
            for (i = 1; i <= size; i++) {
                if(game[player].stats[carta.custo['custo'+i]].valor < carta.custo_qtd['custo_qtd'+i]) {
                    return false;
                }
            }
            return true;
        }
        
        return game[player].stats[carta.custo].valor >= carta.custo_qtd;
    },

    getRandomCards: function() {
        var arr = [];
        for (i = 0; i < 8; i++) {
            var keys = Object.keys(jsonCards);
            var random = keys[Math.floor(Math.random() * keys.length)];
            arr.push(JSON.stringify(jsonCards[random]));
        }
        return arr;
    },

    passaTurno: function(player) {
        if(player == 'player1') {
            enemy = game.player2.stats;
        } else {
            enemy = game.player1.stats;
        }
        
        preparaTurno(enemy);

        return game;
    },

    usarCarta: function(idCarta, player) {
        var carta = getCarta(idCarta);
        var me    = game[player].stats;
        var enemy;
        
        if(player == 'player1') {
            enemy = game.player2.stats;
        } else {
            enemy = game.player1.stats;
        }

        switch(carta.tipo) {

            case 'ataque': {
                if(carta.alvo == 'inimigo') {
                    if(enemy.muro.valor > 0) {
                        enemy.muro.valor -= carta.alvo_qtd;
                        if(enemy.muro.valor < 0) {
                            enemy.castelo.valor += enemy.muro.valor;
                            enemy.muro.valor = 0;
                        }
                    } else if(enemy.muro.valor == 0) {
                        enemy.castelo.valor -= carta.alvo_qtd;
                    }
                } else {
                    enemy[carta.alvo].valor -= carta.alvo_qtd;
                }
                break;
            }

            case 'troca_ataque': {
                enemy[carta.alvo.alvo1].valor -= carta.alvo_qtd.alvo_qtd1;
                me[carta.alvo.alvo2].valor += carta.alvo_qtd.alvo_qtd2;
                break;
            }

            case 'magia_recurso': {
                me.producao = carta.alvo;
                break;
            }

            case 'recursos_multiplos': {
                if(carta.alvo instanceof Object) {
                    var size = Object.keys(carta.alvo).length;
                    for(i = 1; i <= size; i++) {
                        console.log('Alvo: '+carta.alvo['alvo'+i]);
                        me[carta.alvo['alvo'+i]].valor += carta.alvo_qtd;
                    }
                }
                break;
            }

            case 'magia_ataque': {
                enemy[carta.alvo].valor -= carta.alvo_qtd;
                if(enemy[carta.alvo].valor < 0) {
                    enemy[carta.alvo].valor = 0;
                }
                break;
            }

            /**
             * defesa, troca_defesa, recurso e magia
             */
            default: {
                me[carta.alvo].valor += carta.alvo_qtd;
                break;
            }
        }

        // Aplica o(s) valor(es) do(s) custo(s) da carta
        if(carta.custo instanceof Object) {
            // Se houver mais de um custo (custo: {custo1, custo2} )
            var size = Object.keys(carta.custo).length;
            var custo;
            var qtd;
            for(i = 1; i <= size; i++) {
                custo = 'custo'+i;
                qtd  = 'custo_qtd'+i;
                pagarCusto(carta.custo[custo], carta.custo_qtd[qtd], player);
                logaOperacao(carta.custo[custo], carta.custo_qtd[qtd], player, carta);
            }
        } else {
            pagarCusto(carta.custo, carta.custo_qtd, player);
            logaOperacao(carta.custo, carta.custo_qtd, player, carta);
        }

        return game;
    },

    pegarNovaCarta: function() {
        var arr = [];
        var keys = Object.keys(jsonCards);
        var random = keys[Math.floor(Math.random() * keys.length)];
        arr.push(JSON.stringify(jsonCards[random]));
        return arr;
    },

    hasAWinner: function() {
        var p1 = game.player1.stats;
        var p2 = game.player2.stats;
        
        return p1.castelo.valor <= 0 || p1.castelo.valor >= 100 || p2.castelo.valor <= 0 || p2.castelo.valor >= 100;
    },

    isPlayerOneWinner() {
        var p1 = game.player1.stats;
        var p2 = game.player2.stats;

        return p1.castelo.valor >= 100 || p2.castelo.valor <= 0;
    }
}