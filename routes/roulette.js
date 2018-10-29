let express = require('express');
let rouletteOptions = require('../models/rouletteOptions');
let router = express.Router();
let mongoose = require('mongoose');


var mongodbUri = 'mongodb://roulettedb:gsai231@ds125683.mlab.com:25683/webgame';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect To [ ' + db.name + ']', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [' + db.name + ']');
});


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

            res.send(JSON.stringify(cards, null, 5))

        })
};

/**
 *
 * @param req
 * @param res
 * This was to add the data
 * Mode data can be added
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

/**
 *
 * @param req
 * @param res
 */

router.roulette = (req, res) => {


    res.setHeader('Content-Type', 'application/json');


    rouletteOptions.count().exec(
        /**
         *
         * @param err
         * @param count used to get random entry
         */
        function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count);

            // Again query all users but only fetch one offset by our random #
            rouletteOptions.findOne().skip(random).exec(
                /**
                 *
                 * @param err
                 * @param result the cad to return
                 */
                function (err, result) {
                    // Tada! random card for roulette
                    res.send(JSON.stringify(result, null, 5));
                })
        })
};


module.exports = router;