let mongoose = require('mongoose');

let PlayerSchema = new mongoose.Schema({
        name:String,
        email: {type: String},
        password: {type:String},
        lives: {type: Number, default: 400},
        cards:[
            {id: 0, name: "Zeus", type: "melee", ability: "", damage: 120},
            {id: 1, name: "Hera", type: "ranged", ability: "", damage: 40},
            {id: 2, name: "Poseidon", type: "magic", ability: "", damage: 50},
            {id: 3, name: "Demeter", type: "magic", ability: "", damage: 20},
            {id: 4, name: "Ares", type: "melee", ability: "", damage: 75},
            {id: 5, name: "Athena", type: "ranged", ability: "", damage: 40},
            {id: 6, name: "Apollo", type: "ranged", ability: "", damage: 60},
            {id: 7, name: "Artemis", type: "magic", ability: "", damage: 45},
            {id: 8, name: "Hephaestus", type: "magic", ability: "", damage: 55},
            {id: 9, name: "Aphrodite", type: "magic", ability: "", damage: 20}
        ],
    },
    { collection: 'playerdb' });

module.exports = mongoose.model('player', PlayerSchema);