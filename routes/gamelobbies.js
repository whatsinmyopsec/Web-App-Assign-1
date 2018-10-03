let Lobbies = require('../models/lobbies');
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lobbiesdb');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Lobbies.find(function(err, lobbies) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(lobbies,null,5));
    });
}


router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Lobbies.find({ "_id" : req.params.id },function(err, lobby) {
        if (err)
            res.json({ message: 'Lobby NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(lobby,null,5));
    });
}

function getByValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.id === id;
    });
    return result ? result[0] : null; // or undefined
}

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.findTotalVotes = (req, res) => {

    Lobbies.find(function(err, lobbies) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(lobbies) });
    });
}

router.addLobby = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var lobby = new Lobby();

    lobby.gametype = req.body.gametype;

    lobby.save(function(err) {
        if (err)
            res.json({ message: 'Lobby NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Lobby Successfully Added!', data: lobby });
    });
}

router.incrementUpvotes = (req, res) => {
    var lobby = getByValue(lobbies,req.params.id);

    if (lobby != null) {
        lobby.upvotes += 1;
        res.json({status : 200, message : 'UpVote Successful' , lobby : lobby });
    }
    else
        res.send('Lobby NOT Found - UpVote NOT Successful!!');

}

router.deleteLobby = (req, res) => {

    Lobbies.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Lobby NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Lobby Successfully Deleted!'});
    });
}

module.exports = router;