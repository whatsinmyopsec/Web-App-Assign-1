const seeder = require('mongoose-seed');
var logger = require('winston');


const seed = function (cb) {
    seeder.connect('mongodb://localhost:27017/lobbiesdb', function () {

        // Load the player model
        seeder.loadModels([
            'models/player.js',

        ]);
        // Drop existing Player documents
        seeder.clearModels(['player'], function () {

            // Populate from data.json
            seeder.populateModels(require('./data.json'), function (err) {
                if (err) {
                    logger.error('Error seeding', err);
                    if (require.main === module) {
                        return process.exit(1);
                    } else {
                        return cb(err);
                    }
                }

                logger.log('Seeding done.');
                if (require.main === module) {
                    process.exit(0);
                } else {
                    return cb();
                }
            });

        });
    });
};

if (require.main === module) {
    seed(function() {
        logger.log('Seeding complete, exiting.');
    });
}

module.exports = seed;

/*
'use strict';
import Player from '../models/player';



Player.find({}).removeAsync()
    .then(() => {
        Player.create({
                id: 10,
                name: "Hermes",
                type: "melee",
                ability: "",
                damage: 40
            },
            {
                id: 11,
                name: "Dionysus",
                type: "ranged",
                ability: "",
                damage: 35
            },
            {
                id: 12,
                name: "Hades",
                type: "melee",
                ability: "",
                damage: 65
            },
            {
                id: 13,
                name: "Hypnos",
                type: "ranged",
                ability: "",
                damage: 50
            },
            {
                id: 14,
                name: "Nike",
                type: "melee",
                ability: "",
                damage: 25
            },
            {
                id: 15,
                name: "Janus",
                type: "ranged",
                ability: "",
                damage: 30
            },
            {
                id: 16,
                name: "Nemesis",
                type: "magic",
                ability: "",
                damage: 60
            },
            {
                id: 17,
                name: "Iris",
                type: "ranged",
                ability: "",
                damage: 45
            },
            {
                id: 18,
                name: "Hecate",
                type: "melee",
                ability: "",
                damage: 60
            },
            {
                id: 19,
                name: "Tyche",
                type: "ranged",
                ability: "",
                damage: 75
            }
        )
    }
    );*/
