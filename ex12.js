(function () {
    'use strict';

    const diffOfCapToSmall = 'A'.charCodeAt(0) - 'a'.charCodeAt(0);

    function capitalizeVowels(string) {
        function fromSmallToCapital(character) {
            return String.fromCharCode(character.charCodeAt(0) + diffOfCapToSmall);
        }

        let vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);
        let chars = [];

        for(let element of string) {
            if(vowels.has(element)) {
                chars.push(fromSmallToCapital(element));
            }
            else {
                chars.push(element);
            }
        }

        return chars.join('');
    }

    var readlineSync = require('readline-sync');
    let resultMessage = 'Capitalized vowels of sentence:';

    let userInput = readlineSync.question('Please enter a sentence: ');
    console.log(resultMessage, capitalizeVowels(userInput));
}) ();
