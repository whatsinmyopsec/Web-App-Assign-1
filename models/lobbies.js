let mongoose = require('mongoose');

let LobbySchema = new mongoose.Schema({
        id: String,
        gametype: String,
        upvotes: {type: Number, default: 0},
        lobbynumber: {type: Number, unique: true}
    },
    { collection: 'lobbiesdb' });

module.exports = mongoose.model('Lobby', LobbySchema);