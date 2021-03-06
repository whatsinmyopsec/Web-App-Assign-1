let mongoose = require('mongoose');


let PlayerSchema = new mongoose.Schema({
        name:String,
        email: {type: String, unique: true},
        password: {type:String},
        lives: {type: Number, default: 400},
    //should there be a foreign key for this?
        cards:[
            {
                id: String,
                name: String,
                type: String,
                ability: String,
                damage: String
            }
        ],
    },
    { collection: 'playerdb' });

module.exports = mongoose.model('player', PlayerSchema);
