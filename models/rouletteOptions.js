let mongoose = require('mongoose');

let rouletteSchema = new mongoose.Schema({
            id: String,
            name: String,
            type: String,
            ability: String,
            damage: String
    },
    { collection: 'roulettedb' });

module.exports = mongoose.model('rouletteOptions', rouletteSchema);