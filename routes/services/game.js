var jsonCards = require('../cards/all-cards').cards;

// Vars do meu castelo
var myWall;
var myCastle;
var myMages;
var myCrystals;
var mySoldiers;
var myWeapons;
var myConstructors;
var myBricks;

// Vars do castelo do inimigo
var enemyWall;
var enemyCastle;
var enemyMages;
var enemyCrystals;
var enemySoldiers;
var enemyWeapons;
var enemyConstructors;
var enemyBricks;

function getCarta(id) {
        var keys = Object.keys(jsonCards);
        for(i = 0; i < keys.length; i++) {
            var nomeCarta = keys[i];
            var carta = jsonCards[nomeCarta];
            if(carta.id == id) {
                console.log('Nome: ' + carta.nome);
                return carta;
            }
        }
}

function pagarCusto(custo, custo_qtd) {
    if(custo == 'cristais') {
        myCrystals -= custo_qtd;
    } else if(custo == 'armas') {
        myWeapons -= custo_qtd;
    } else if(custo == 'tijolos'){
        myBricks -= custo_qtd;
    }
}

module.exports = {
    initiliazeVars: function(){
        myWall         = 0;
        myCastle       = 50;
        myMages        = 1;
        myCrystals     = 0;
        mySoldiers     = 1;
        myWeapons      = 0;
        myConstructors = 1;
        myBricks       = 0;

        enemyWall         = 0;
        enemyCastle       = 50;
        enemyMages        = 1;
        enemyCrystals     = 0;
        enemySoldiers     = 1;
        enemyWeapons      = 0;
        enemyConstructors = 1;
        enemyBricks       = 0;
    },

    getRandomCards: function () {
        var arr = [];
        for (i = 0; i < 8; i++) {
            var keys = Object.keys(jsonCards);
            var random = keys[Math.floor(Math.random() * keys.length)];
            arr.push(JSON.stringify(jsonCards[random]));
        }
        return arr;
    },

    usarCarta: function(idCarta) {
        var returnObj = {};
        var carta = getCarta(idCarta);
        
        switch(carta.tipo) {
            case 'ataque': {
                if(carta.alvo == 'inimigo') {
                    // Se existir muro, ataca o muro
                    if(enemyWall > 0) {
                        enemyWall -= carta.alvo_qtd;
                        // Se o dano causado for maior que o HP do muro, tira o resto do dano direto do Castelo e zera o HP do muro
                        if(enemyWall < 0) {
                            enemyCastle += enemyWall;
                            enemyWall = 0;
                        }
                    } else if(enemyWall == 0) {
                        enemyCastle -= carta.alvo_qtd;
                    }
                } else if(carta.alvo == 'castelo_inimigo') {
                    enemyCastle -= carta.alvo_qtd;
                }

                returnObj.enemyCastle = enemyCastle;
                returnObj.enemyWall = enemyWall;
            }
            
            case 'defesa': {
                if(carta.alvo == 'castelo') {
                    myCastle += carta.alvo_qtd;
                } else if(carta.alvo == 'muro') {
                    myWall += carta.alvo_qtd;
                }

                returnObj.myCastle = myCastle;
                returnObj.myWall = myWall;
            }

            default: {
                // Valida e aplica o(s) valor(es) do(s) custo(s) da carta
                if(carta.nome instanceof Object) {
                    // Se houver mais de um custo (custo: {custo1, custo2} )
                    var size = Object.keys(carta.custo).length;
                    var custo;
                    var qtd;
                    for(i = 1; i <= size; i++) {
                        custo = 'custo'+i;
                        qtd  = 'custo_qtd'+i;
                        pagarCusto(carta.custo[custo], carta.custo_qtd[qtd]);
                    }
                } else {
                    pagarCusto(carta.custo, carta.custo_qtd);
                }
            }
        }

        return returnObj;
    }
}