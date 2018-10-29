let express = require('express');
let rouletteOptions = require('../models/rouletteOptions');
let router = express.Router();
let rand = require('./randomize');
let mongoose = require('mongoose');

var mongodbUri ='mongodb://roulettedb:gsai231@ds125683.mlab.com:25683/webgame';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function(err) {console.log('Unable to Connect To [ ' + db.name+']', err);});
db.once('open', function(){console.log('Successfully Connected to [' +db.name+']' );});


/**
 *
 * @param req
 * @param res
 */
router.testfunction = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    rouletteOptions.find(
        /**
         *
         * @param err
         * @param cards
         */
        function (err, cards) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(cards,null,5))

    })
};

/**
 *
 * @param req
 * @param res
 */

router.additems = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var card = new rouletteOptions();

    card.id = req.body.id;
    card.name = req.body.name;
    card.type = req.body.type;
    card.ability = req.body.ability;
    card.damage = req.body.damage;

    card.save(function (err) {
        if (err)
            res.json({message: 'Card NOT Added!', errmsg: err});
        else
            res.json({message: 'Card Successfully Added!', data: card});
    });
};

//NEEDS TO BE SOME KIND OF TIMEOUT ON THIS
//AD FOR USE ..ETC



//NEEDS A FUNCTION TO BE PROVABLY FAIR



//NEEDS A FUNCTION TO MAKE RESULT RANDOM
//MAYBE REUSE OF RANDOMIZE FUNCTION









module.exports = router;