let mongoose = require('mongoose');

let LobbySchema = new mongoose.Schema({
        gametype: String,
        upvotes: {type: Number, default: 0},
        lobbynumber: Number
    },
    { collection: 'lobbiesdb' });

module.exports = mongoose.model('Lobby', LobbySchema);