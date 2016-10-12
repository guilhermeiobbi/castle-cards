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

function adaptReturnObj(returnObj) {
    var returnObj = {};

    returnObj.enemyCastle = enemyCastle;
    returnObj.enemyWall = enemyWall;
    
    returnObj.myCastle = myCastle;
    returnObj.myWall = myWall;
    
    returnObj.myConstructors = myConstructors;
    returnObj.mySoldiers = mySoldiers;
    returnObj.myMages = myMages;

    returnObj.myCrystals = myCrystals;
    returnObj.myBricks = myBricks;
    returnObj.myWeapons = myWeapons;

    return returnObj;
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
                break;
            }
            
            case 'defesa': {
                if(carta.alvo == 'castelo') {
                    myCastle += carta.alvo_qtd;
                } else if(carta.alvo == 'muro') {
                    myWall += carta.alvo_qtd;
                }
                break;
            }

            case 'magia': {
                if(carta.alvo == 'cristais') {
                    myCrystals += carta.alvo_qtd;
                } else if(carta.alvo == 'armas') {
                    myWeapons += carta.alvo_qtd;
                } else if(carta.alvo == 'tijolos') {
                    myBricks += carta.alvo_qtd;
                }
                break;
            }

            case 'magia_recurso': {

            }

            case 'recurso': {
                if(carta.alvo == 'construtor') {
                    myConstructors += carta.alvo_qtd;
                } else if(carta.alvo == 'soldado') {
                    mySoldiers += carta.alvo_qtd;
                } else if(carta.alvo == 'mago') {
                    myMages += carta.alvo_qtd;
                }
                break;
            }

            case 'recursos_multiplos': {
                myConstructors += carta.alvo_qtd;
                mySoldiers += carta.alvo_qtd;
                myMages += carta.alvo_qtd;
                break;
            }

            case 'magia_ataque': {
                if (carta.alvo == 'cristais') {
                    enemyCrystals -= carta.alvo_qtd;
                    if(enemyCrystals < 0) {
                        enemyCrystals = 0;
                    }
                } else if (carta.alvo == 'tijolos') {
                    enemyBricks -= carta.alvo_qtd;
                    if(enemyBricks < 0) {
                        enemyBricks = 0;
                    }
                } else if (carta.alvo == 'armas') {
                    enemyWeapons -= carta.alvo_qtd;
                    if(enemyWeapons < 0) {
                        enemyWeapons = 0;
                    }
                }
                break;
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
        return adaptReturnObj();
    }
}