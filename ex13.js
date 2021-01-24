(function () {
    'use strict';

    const diffOfCapToSmall = 'A'.charCodeAt(0) - 'a'.charCodeAt(0);

    function longestWordInSentece(string) {
        let maxStr = '';
        for(let element of string.split(' ')) {
            maxStr = maxStr.length < element.length? element: maxStr;
        }

        return maxStr;
    }

    var readlineSync = require('readline-sync');
    let resultMessage = 'Longest word in sentence:';

    let userInput = readlineSync.question('Please enter a sentence: ');
    console.log(resultMessage, longestWordInSentece(userInput));
}) ();
