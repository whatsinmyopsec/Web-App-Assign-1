let player = require('../models/player');
let express = require('express');
let deck = require('./deck');
let card = require('../models/cards');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://playerdb:214325f@ds125683.mlab.com:25683/webgame';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function(err) {console.log('Unable to Connect To [ ' + db.name+']', err);});
db.once('open', function(){console.log('Successfully Connected to [' +db.name+']' );});

/**
 *
 * @param req
 * @param res
 */
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    player.find(
        /**
         *
         * @param err
         * @param players
         */
        function (err, players) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(players, null, 5));
    });
};

/**
 *
 * @param req
 * @param res
 */

router.getPlayersCount = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    player.find().count(
        /**
         *
         * @param err
         * @param players
         */
        function (err, players) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(players, null, 5));
    });

};

/**
 *
 * @param req
 * @param res
 */

router.findOne = (req, res) => {

        res.setHeader('Content-Type', 'application/json');

        player.find({"_id": req.params.id},
            /**
             *
             * @param err
             * @param players
             */
            function (err, players) {
            if (err)
                res.json({message: 'Player NOT Found!', errmsg: err});
            else
                res.send(JSON.stringify(players, null, 5));
        });
};


/**
 *
 * @param array
 * @returns {number}
 */

function getTotalLives(array) {
    let totalLives = 0;
    array.forEach(function (obj) {
        totalLives += obj.lives;
    });
    return totalLives;
}

/**
 *
 * @param req
 * @param res
 */
router.findTotalLives = (req, res) => {

    player.find(
        /**
         *
         * @param err
         * @param players
         */
        function (err, players) {
        if (err)
            res.send(err);
        else
            res.json({totalLives: getTotalLives(players)});
    });
};

/**
 *
 * @param req
 * @param res
 */

router.addPlayer = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var Player = new player();

    Player.name = req.body.name;
    Player.email = req.body.email;
    Player.password = req.body.password;

    Player.save(function (err) {
        if (err)
            res.json({message: 'Player NOT Added!', errmsg: err});
        else
            res.json({message: 'Player Successfully Added!', data: Player});
    });
};

/**
 *
 * @param array
 * @param damage
 * @returns {null}
 */

function getCardByValue(array, damage) {
    for (const obj of array) {
        if (obj.damage === damage)
        //obj.parseInt(damage);
            return obj;
    }
    return null;
}

/**
 *
 * @param req
 * @param res
 */

router.decrementLives = (req, res) => {
    player.findById(req.params.id);
    var card = getCardByValue(card, req.params.damage);
    let damage = obj.parseInt(card);

    if (player != null) {
        player.lives -= damage;
        res.json({status: 200, message: 'Damage dealt Successful', player: player});
    }
    else
        res.send('Player NOT Found - Damage NOT Successful!!');

};

/**
 *
 * @param req
 * @param res
 */

router.deletePlayer = (req, res) => {

    player.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'Player NOT DELETED!', errmsg: err});
        else
            res.json({message: 'Player Successfully Deleted!'});
    });
};


module.exports = router;
