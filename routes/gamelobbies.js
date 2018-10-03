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

    var lobby = getByValue(lobbies, req.params.id);

    if (lobby != null)
        res.send(JSON.stringify(lobby, null, 5));
    else
        res.send('Lobby NOT Found!!');

}

function getByValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.id === id;
    });
    return result ? result[0] : null; // or undefined
}

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function (obj) {
        totalVotes += obj.upvotes;
    });
    return totalVotes;
}

router.findTotalVotes = (req, res) => {

    let votes = getTotalVotes(lobbies);
    res.json({totalvotes: votes});
}

router.addLobby = (req, res) => {
    //Add a new lobby to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = lobbies.length;

    lobbies.push({"id": id, "paymenttype": req.body.paymenttype, "upvotes": 0});

    if ((currentSize + 1) === lobbies.length)
        res.json({message: 'New Lobby Added Successfully!'});
    else
        res.json({message: 'Lobby NOT Added!'});
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
    //Delete the selected donation based on its id
    var lobby = getByValue(lobbies,req.params.id);
    var index = lobbies.indexOf(lobby);

    var currentSize = lobbies.length;
    lobbies.splice(index, 1);

    if((currentSize - 1) === lobbies.length)
        res.json({ message: 'Lobby Deleted!'});
    else
        res.json({ message: 'Lobby NOT Deleted!'});
}

module.exports = router;