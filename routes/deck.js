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
    res.send(JSON.stringify(card,null,5));
};

/**
 *
 * @param req
 * @param res
 */

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var deck = getByValue(card,req.params.id);

    if (deck != null)
        res.send(JSON.stringify(deck,null,5));
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

router.shuffle = function() {
    /*
     * The Fisher-Yates shuffle algorithm is as follows:
     * (reference: https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm)
     * To shuffle an array a of n elements of indices 0 to n-1:
     *      for i from n−1 down to 1 do
     *          j ← random integer such that 0 ≤ j ≤ i
     *          exchange a[j] and a[i]
     */
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