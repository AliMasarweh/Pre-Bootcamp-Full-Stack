(function () {
    'use strict';
    
    var readlineSync = require('readline-sync');

    let targetedSum = 10, positiveResponse = 'makes 10', negativeResponse = 'nope';

    let isSumOfChecker = (sum, positiveResponse, negativeResponse) => 
                (num1, num2) => ((num1+num2) === sum)? positiveResponse: negativeResponse;

    let isSumOfTen = isSumOfChecker(targetedSum, positiveResponse, negativeResponse);

    // Wait for user's response.
    let numbers = readlineSync.question('Enter two whole numbers that adds up to 10: ').split(' ');

    let number1 = parseFloat(numbers[0]), number2 = parseFloat(numbers[1]);

    console.log(isSumOfTen(number1, number2));
}) ();
