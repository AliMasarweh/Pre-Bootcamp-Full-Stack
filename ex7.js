(function () {
    'use strict';
    var readlineSync = require('readline-sync');
    let userMessage = 'Please enter a positive number or zero: ';
    let printFactorialMessage = 'Factorial result:'

    let num = parseInt(readlineSync.question(userMessage));
    while(isNaN(num) || num < 0) {
        num = parseInt(readlineSync.question(userMessage));
    }

    let factorial = 1;
    for(let i = 2; i <= num; ++i) {
        factorial *= i;
    }

    console.log(printFactorialMessage, factorial);
}) ();

