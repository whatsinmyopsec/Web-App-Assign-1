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

module.exports = seed;