let mongoose = require('mongoose');

let PlayerSchema = new mongoose.Schema({
        name:String,
        email: {type: String},
        password: {type:String},
        life: {type: Number, default: 400}
    },
    { collection: 'lobbiesdb' });

module.exports = mongoose.model('player', PlayerSchema);