'use strict';

module.exports = {
    /**
     * @function getRandomNumber
     * @description Generate a random number between a lower and an upper limit.
     * @param {number} min The lower limit
     * @param {number} max The upper limit
     * @returns {number}
     */
    getRandomNumber: function (min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
};