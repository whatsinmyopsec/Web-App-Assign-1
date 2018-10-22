let mongoose = require('mongoose');

let rouletteSchema = new mongoose.Schema({
        cards:[
            {id: 10, name: "Hermes", type: "melee", ability: "", damage: 40},
            {id: 11, name: "Dionysus", type: "ranged", ability: "", damage: 35},
            {id: 12, name: "Hades", type: "melee", ability: "", damage: 65},
            {id: 13, name: "Hypnos", type: "ranged", ability: "", damage: 50},
            {id: 14, name: "Nike", type: "melee", ability: "", damage: 25},
            {id: 15, name: "Janus", type: "ranged", ability: "", damage: 30},
            {id: 16, name: "Nemesis", type: "magic", ability: "", damage: 60},
            {id: 17, name: "Iris", type: "ranged", ability: "", damage: 45},
            {id: 18, name: "Hecate", type: "melee", ability: "", damage: 60},
            {id: 19, name: "Tyche", type: "ranged", ability: "", damage: 75}
        ],
    },
    { collection: 'roulettedb' });

module.exports = mongoose.model('rouletteOptions', rouletteSchema);