var express   = require('express');
var router    = express.Router();
var game      = require('./services/game');

router.get('/newGame', function(req, res) {
    var gameCfg = game.initializeVars();
    var selectedCards = game.getRandomCards();
    var obj = {game:  JSON.parse(gameCfg),
               cards: JSON.parse(JSON.stringify(selectedCards))};
    res.render('page', obj);
});

module.exports = router;