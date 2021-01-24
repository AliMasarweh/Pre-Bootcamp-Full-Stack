(function () {
    'use strict';

    let minInt = 1, maxInt = 50;

    function randomArray(len) {
        function randomInteger(min, max) {
            return Math.floor(Math.random()*(max - min + 1) + min);
        }

        let ret = [];
        for(let i = 0; i < len; ++i) {
            ret.push(randomInteger(minInt, maxInt));
        }

        return ret;
    }
    
    const invalidInputMessage = 'Invalid Input, not a number or negative'
    let readlineSync = require('readline-sync');

    let userInput = parseInt(readlineSync.question('Please enter a number: '));
    if(isNaN(userInput) || userInput < 1) {
        console.log(invalidInputMessage);
        return;
    }

    let array = randomArray(userInput);

    let minRet = maxInt, maxRet = minInt;
    for(let num of array) {
        minRet = Math.min(minRet, num);
        maxRet = Math.max(maxRet, num);
    }

    console.log(`min is ${minRet} & max is ${maxRet}`);
}) ();
