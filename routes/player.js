let player = require('../models/player');
let express = require('express');
let router = express.Router();

//players fix needed

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    player.find(function(err, players) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(players,null,5));
    });
}


router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    player.find({ "_id" : req.params.id },function(err, players) {
        if (err)
            res.json({ message: 'Lobby NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(players,null,5));
    });
}

function getByValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.id === id;
    });
    return result ? result[0] : null; // or undefined
}

function getTotalLife(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes -= obj.lives; });
    return totalVotes;
}

router.findTotalVotes = (req, res) => {

    lobbies.find(function(err, lobbies) {
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
    lobby.lobbynumber = req.body.lobbynumber;

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

    lobbies.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Lobby NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Lobby Successfully Deleted!'});
    });
}


module.exports = router;