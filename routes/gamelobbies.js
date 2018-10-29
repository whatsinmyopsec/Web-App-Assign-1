let lobbies = require('../models/lobbies');
let express = require('express');
let router = express.Router();
require('dotenv').config();
let mongoose = require('mongoose');

var mongodbUri = 'mongodb://lobbiesdb:12345k@ds125683.mlab.com:25683/webgame';

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

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    lobbies.find(
        /**
         *
         * @param err
         * @param lobbies
         */
        function (err, lobbies) {
            if (err)
                res.send(err);

            res.send(JSON.stringify(lobbies, null, 5));
        });
};

/**
 *
 * @param req
 * @param res
 */

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    lobbies.find({"_id": req.params.id},
        /**
         *
         * @param err
         * @param lobby
         */
        function (err, lobby) {
            if (err)
                res.json({message: 'Lobby NOT Found!', errmsg: err});
            else
                res.send(JSON.stringify(lobby, null, 5));
        });
};

/**
 *
 * @param array
 * @returns {number} votes
 */

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function (obj) {
        totalVotes += obj.upvotes;
    });
    return totalVotes;
}

/**
 *
 * @param req
 * @param res
 */

router.findTotalVotes = (req, res) => {

    lobbies.find(
        /**
         *
         * @param err
         * @param lobbies
         */
        function (err, lobbies) {
            if (err)
                res.send(err);
            else
                res.json({totalvotes: getTotalVotes(lobbies)});
        });
};

/**
 *
 * @param req
 * @param res
 */

router.addLobby = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var lobby = new lobbies();

    lobby.id = req.body.id;
    lobby.gametype = req.body.gametype;
    lobby.lobbynumber = req.body.lobbynumber;

    lobby.save(function (err) {
        if (err)
            res.json({message: 'Lobby NOT Added!', errmsg: err});
        else
            res.json({message: 'Lobby Successfully Added!', data: lobby});
    });
};

/**
 *
 * @param req
 * @param res
 */

router.incrementUpvotes = (req, res) => {
    lobbies.findById(req.params.id, function (err, lobby) {
        if (err)
            res.json({message: 'Lobby NOT Found!', errmsg: err});
        else {
            lobby.upvotes += 1;
            lobby.save(function (err) {
                if (err)
                    res.json({message: 'Lobby NOT UpVoted!', errmsg: err});
                else
                    res.json({message: 'Lobby Successfully Upvoted!', data: lobby});
            });

        }
    });
};

/**
 *
 * @param req
 * @param res
 */

router.deleteLobby = (req, res) => {

    lobbies.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.json({message: 'Lobby NOT DELETED!', errmsg: err});
        else
            res.json({message: 'Lobby Successfully Deleted!'});
    });
};


module.exports = router;