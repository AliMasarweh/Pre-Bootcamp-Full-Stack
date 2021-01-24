(function () {
    'use strict';
    var readlineSync = require('readline-sync');

    let normalMessageLagerThan = (num) => `please choose a number larger than ${num}\n`;
    let normalMessageEmphasizedLagerThan = (num) => `please choose a number LARGER than ${num}\n`;
    let thankingMessage = 'thank you!';
    let lowerBoundNumber = 10;

    let num = parseInt(readlineSync.question(normalMessageLagerThan(lowerBoundNumber)));
    
    let emphasizedMess = normalMessageEmphasizedLagerThan(lowerBoundNumber);
    while(num <= lowerBoundNumber) {
        num = parseInt(readlineSync.question(emphasizedMess));
    }

    console.log(thankingMessage);
}) ();

