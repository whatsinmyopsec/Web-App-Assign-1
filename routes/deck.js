let card = require('../models/cards');
let random = require('./randomize');
let express = require('express');
let router = express.Router();
const deckSize = card.length;

/**
 *
 * @param req
 * @param res
 */

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(card, null, 5));
};

/**
 *
 * @param req
 * @param res
 */

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var deck = getByValue(card, req.params.id);

    if (deck != null)
        res.send(JSON.stringify(deck, null, 5));
    else
        res.send('deckCard NOT Found!!');

};

/**
 *
 * @param array
 * @param id
 * @returns {null}
 */

function getByValue(array, id) {
    for (const obj of array) {
        if (obj.id === id)
            return obj;
    }
    return null;
}

/**
 * this was basically copied from this repo
 * https://github.com/ashok-s-nair/card-shuffle-deal/blob/master/app/carddeck.js
 * but for random on roulette i did it another way
 */
router.shuffle = function () {

    let rIndex = 0;
    let holdingRef = null;

    for (let sRef = deckSize - 1; sRef > 0; sRef--) {
        rIndex = random.getRandomNumber(0, sRef);
        holdingRef = this.card[sRef - 1];
        this.card[sRef - 1] = this.card[rIndex];
        this.card[rIndex] = holdingRef;
    }
};


module.exports = router;