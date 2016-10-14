var jsonCards = require('../cards/all-cards').cards;

function Stats() {
    this.wall = {nome: 'Muro', valor: 0};
    this.castle = {nome: 'Castelo', valor: 50};
    this.mages = {nome: 'Mago', valor: 1},
    this.crystals = {nome: 'Cristal', valor: 0},
    this.soldiers = {nome: 'Soldado', valor: 1},
    this.weapons = {nome: 'Armas', valor: 0},
    this.constructors = {nome: 'Construtor', valor: 1},
    this.bricks = {nome: 'Tijolo', valor: 0}
    return this;
}

var game = 
{
    player1: {}, 
    player2: {}
};

function getCarta(id) {
    var keys = Object.keys(jsonCards);
    for(i = 0; i < keys.length; i++) {
        var nomeCarta = keys[i];
        var carta = jsonCards[nomeCarta];
        if(carta.id == id) {
            console.log('Nome da Carta: ' + carta.nome);
            return carta;
        }
    }
}

function pagarCusto(custo, custo_qtd, player) {
    if(custo == 'cristais') {
        game[player].stats.crystals.valor -= custo_qtd;
    } else if(custo == 'armas') {
        game[player].stats.weapons.valor -= custo_qtd;
    } else if(custo == 'tijolos'){
        game[player].stats.bricks.valor -= custo_qtd;
    }
    console.log('Jogador: '+player+' pagou: ' +custo_qtd+' '+custo);
}

module.exports = {
    initializeVars: function(){
        arr = [];

        game.player1.stats = new Stats();
        game.player2.stats = new Stats();
        
        arr.push(JSON.stringify(game));

        return arr;
    },

    hasResources: function (id, player) {
        
        var carta = getCarta(id);

        console.log('game :'+JSON.stringify(game[player]));
        
        if(carta.custo == 'cristais') {
            return game[player].stats.crystals.valor >= carta.custo_qtd;
        } else if(carta.custo == 'armas') {
            return game[player].stats.weapons.valor >= carta.custo_qtd;
        } else if(carta.custo == 'tijolos') {
            return game[player].stats.bricks.valor >= carta.custo_qtd;
        }
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
        var me = game[player].stats;
        
        me.crystals.valor += me.mages.valor;
        me.bricks.valor   += me.constructors.valor;
        me.weapons.valor  += me.soldiers.valor;

        return game;
    },

    usarCarta: function(idCarta, player) {
        var carta = getCarta(idCarta);
        var me = game[player].stats;
        var enemy;
        
        if(player == 'player1') {
            enemy = game.player2.stats;
        } else {
            enemy = game.player1.stats;
        }

        switch(carta.tipo) {
            case 'ataque': {
                if(carta.alvo == 'inimigo') {
                    if(enemy.wall.valor > 0) {
                        enemy.wall.valor -= carta.alvo_qtd;
                        if(enemy.wall.valor < 0) {
                            enemy.castle.valor += game.stats.wall;
                            enemy.wall.valor = 0;
                        }
                    } else if(enemy.wall.valor == 0) {
                        enemy.castle.valor -= carta.alvo_qtd;
                    }
                } else if(carta.alvo == 'castelo_inimigo') {
                    enemy.castle.valor -= carta.alvo_qtd;
                }
                break;
            }

            case 'troca_defesa': {
                //TODO: implementar
            }
            
            case 'defesa': {
                if(carta.alvo == 'castelo') {
                    me.castle.valor += carta.alvo_qtd;
                } else if(carta.alvo == 'muro') {
                    me.wall.valor += carta.alvo_qtd;
                }
                break;
            }

            case 'magia': {
                if(carta.alvo == 'cristais') {
                    me.crystals.valor += carta.alvo_qtd;
                } else if(carta.alvo == 'armas') {
                    me.weapons.valor += carta.alvo_qtd;
                } else if(carta.alvo == 'tijolos') {
                    me.bricks.valor += carta.alvo_qtd;
                }
                break;
            }

            case 'magia_recurso': {
                //TODO: implementar
            }

            case 'recurso': {
                if(carta.alvo == 'construtor') {
                    me.constructors.valor += carta.alvo_qtd;
                } else if(carta.alvo == 'soldado') {
                    me.soldiers.valor += carta.alvo_qtd;
                } else if(carta.alvo == 'mago') {
                    me.mages.valor += carta.alvo_qtd;
                }
                break;
            }

            case 'recursos_multiplos': {
                me.constructors.valor += carta.alvo_qtd;
                me.soldiers.valor += carta.alvo_qtd;
                me.mages.valor += carta.alvo_qtd;
                break;
            }

            case 'magia_ataque': {
                if (carta.alvo == 'cristais') {
                    enemy.crystals.valor -= carta.alvo_qtd;
                    if(enemy.crystals.valor < 0) {
                        enemy.crystals.valor = 0;
                    }
                } else if (carta.alvo == 'tijolos') {
                    enemy.bricks.valor -= carta.alvo_qtd;
                    if(enemy.bricks.valor < 0) {
                        enemy.bricks.valor = 0;
                    }
                } else if (carta.alvo == 'armas') {
                    enemy.weapons.valor -= carta.alvo_qtd;
                    if(enemy.weapons.valor < 0) {
                        enemy.weapons.valor = 0;
                    }
                }
                break;
            }
        }
        // Valida e aplica o(s) valor(es) do(s) custo(s) da carta
        if(carta.nome instanceof Object) {
            // Se houver mais de um custo (custo: {custo1, custo2} )
            var size = Object.keys(carta.custo).length;
            var custo;
            var qtd;
            for(i = 1; i <= size; i++) {
                custo = 'custo'+i;
                qtd  = 'custo_qtd'+i;
                pagarCusto(carta.custo[custo], carta.custo_qtd[qtd], player);
            }
        } else {
            pagarCusto(carta.custo, carta.custo_qtd, player);
        }

        return game;
    }
}