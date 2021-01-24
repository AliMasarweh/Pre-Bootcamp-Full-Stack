(function () {
    'use strict';
    var readlineSync = require('readline-sync');
    let userMessage = 'Please enter a positive number: ';

    let num = parseInt(readlineSync.question(userMessage));
    while(isNaN(num) || num < 0) {
        num = parseInt(readlineSync.question(userMessage));
    }

    console.log(`printing prime numbers smaller or equal to ${num}`)
    if(num < 2)
        return;
    let primes = new Set();
    primes.add(2);
    console.log(2);

    for(let number = 3; number <= num; number += 2) {
        let isPrime = true;
        primes.forEach(prime => isPrime = isPrime && (number%prime != 0)); 

        if(isPrime) {
            console.log(number);
            primes.add(number);
        }
    }
}) ();

