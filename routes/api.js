var express   = require('express');
var router    = express.Router();
var jsonCards = require('./cards/all-cards').cards;

router.get('/getCards', function(req, res) {
    var selectedCards = getRandomCards();
    res.render('gameboard', {cards: JSON.stringify(selectedCards)});
});

function getRandomCards() {
    var arr = [];
    for (i = 0; i < 8; i++) {
        var keys = Object.keys(jsonCards);
        var random = keys[Math.floor(Math.random() * keys.length)];
        arr.push(JSON.stringify(jsonCards[random]));
    }
    return arr;
}

module.exports = router;