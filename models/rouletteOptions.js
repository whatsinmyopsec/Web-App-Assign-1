let mongoose = require('mongoose');

let rouletteSchema = new mongoose.Schema({
        cards:[
            {id: 10, name: "Hermes", type: "melee", ability: "", damage: 140},
            {id: 11, name: "Dionysus", type: "ranged", ability: "", damage: 135},
            {id: 12, name: "Hades", type: "melee", ability: "", damage: 165},
            {id: 13, name: "Hypnos", type: "ranged", ability: "", damage: 150},
            {id: 14, name: "Nike", type: "melee", ability: "", damage: 125},
            {id: 15, name: "Janus", type: "ranged", ability: "", damage: 130},
            {id: 16, name: "Nemesis", type: "magic", ability: "", damage: 160},
            {id: 17, name: "Iris", type: "ranged", ability: "", damage: 145},
            {id: 18, name: "Hecate", type: "melee", ability: "", damage: 160},
            {id: 19, name: "Tyche", type: "ranged", ability: "", damage: 175}
        ],
    },
    { collection: 'roulettedb' });

module.exports = mongoose.model('rouletteOptions', rouletteSchema);