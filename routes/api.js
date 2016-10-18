var express     = require('express');
var router      = express.Router();
var gameService = require('./services/GameService');

router.get('/newGame', function(req, res) {
    var gameCfg       = gameService.initializeVars();
    var selectedCards = gameService.getRandomCards();
    
    var obj = {game:  JSON.parse(gameCfg),
               cards: JSON.parse(JSON.stringify(selectedCards))};
    
    res.render('page', obj);
});

module.exports = router;