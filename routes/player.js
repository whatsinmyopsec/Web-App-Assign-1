let player = require('../models/player');
let express = require('express');
let deck = require('./deck');
let card = require('../models/cards');
let router = express.Router();

//players fix needed

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    player.find(function (err, players) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(players, null, 5));
    });
}

router.getPlayersCount = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    player.find().count(function (err, players) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(players, null, 5));
    });

}

    router.findOne = (req, res) => {

        res.setHeader('Content-Type', 'application/json');

        player.find({"_id": req.params.id}, function (err, players) {
            if (err)
                res.json({message: 'Player NOT Found!', errmsg: err});
            else
                res.send(JSON.stringify(players, null, 5));
        });
    }

function getByValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.id === id;
    });
    return result ? result[0] : null; // or undefined
}

function getTotalLives(array) {
    let totalLives = 0;
    array.forEach(function (obj) {
        totalLives += obj.lives;
    });
    return totalLives;
}

router.findTotalLives = (req, res) => {

    player.find(function (err, players) {
        if (err)
            res.send(err);
        else
            res.json({totalLives: getTotalLives(players)});
    });
}

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
}

function getCardByValue(array, damage) {
    for (const obj of array) {
        if (obj.damage === damage)
        //obj.parseInt(damage);
            return obj;
    }
    return null;
}

/*//ADD THIS FUNCTION
function damagetaken(card) {
    var damage = getCardByValue(card, req.params.damage);



    card.forEach(function(obj) { livesLeft -= obj.Lives; });
    return livesLeft;
}*/

router.decrementLives = (req, res) => {
    var player = getByValue(player, req.params.id);
    var card = getCardByValue(card, req.params.damage);
    var damage = obj.parseInt(card);

    if (player != null) {
        player.lives -= damage;
        res.json({status: 200, message: 'Damage dealt Successful', player: player});
    }
    else
        res.send('Player NOT Found - Damage NOT Successful!!');

}

router.deletePlayer = (req, res) => {

    player.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'Player NOT DELETED!', errmsg: err});
        else
            res.json({message: 'Player Successfully Deleted!'});
    });
}


module.exports = router;