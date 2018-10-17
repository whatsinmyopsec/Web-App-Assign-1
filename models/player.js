let mongoose = require('mongoose');

let PlayerSchema = new mongoose.Schema({
        name:String,
        email: {type: String},
        password: {type:String},
        lives: {type: Number, default: 400}
    },
    { collection: 'playerdb' });

module.exports = mongoose.model('player', PlayerSchema);