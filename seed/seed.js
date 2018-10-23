/*
import * as res from "express";

var seeder = require('mongoose-seed');

var seed = function(req,res) {
    seeder.connect('mongodb://localhost/lobbiesdb', function() {

        // Load the player model
        seeder.loadModels([
            'models/player.js',

        ]);
        // Drop existing Player documents
        seeder.clearModels(['player'], function() {

            // Populate from data.json
            seeder.populateModels(require('./data.json'), function(err) {
                if (err) {
                    res.json({ message: 'Error seeding', errmsg : err } );
                    if (require.main === module) {
                        return process.exit(1);
                    } else {
                        return res(err);
                    }
                }

                res.json({ message: 'Seeding finished', errmsg : err } );
                if (require.main === module) {
                    process.exit(0);
                } else {
                    return res();
                }
            });

        });
    });
};

if (require.main === module) {
    seed(function() {
        res.json({ message: 'Seeding complete, exiting', errmsg : err } );
    });
}

module.exports = seed;*/

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
    );