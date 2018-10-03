let mongoose = require('mongoose');

let LobbySchema = new mongoose.Schema({
        gametype: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'lobbiesdb' });

module.exports = mongoose.model('Lobby', LobbySchema);