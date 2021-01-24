(function () {
    'use strict';
    
    let readlineSync = require('readline-sync');
 
    // Wait for user's response.
    let numberToNumberName = new Map(
        [
            [0, 'Zero'],
            [1, 'One'],
            [2, 'Two'],
            [3, 'Three'],
            [4, 'Four'],
            [5, 'Five'],
            [6, 'Six'],
            [7, 'Seven'],
            [8, 'Eight'],
            [9, 'Nine']
        ]
    );

    console.log(numberToNumberName);

    let number = parseInt(readlineSync.question('Enter a number: '));
    console.log(`Name of number in english is ${numberToNumberName.get(number)}!`);
}) ();

