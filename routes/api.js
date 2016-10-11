var express   = require('express');
var router    = express.Router();
var game      = require('./services/game');

router.get('/newGame', function(req, res) {
    game.initiliazeVars();
    var selectedCards = game.getRandomCards();
    res.render('cards', {cards: JSON.stringify(selectedCards)});
});

module.exports = router;