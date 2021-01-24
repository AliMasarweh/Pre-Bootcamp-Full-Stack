(function () {
    'use strict';
    function isPalindrom(string) {
        let start = 0, end = string.length - 1;

        while(start < end) {
            if(string[start] != string[end])
                return false;
            
            ++start;
            --end;
        }

        return true;
    }

    var readlineSync = require('readline-sync');
    let stringIsPalindromMessage = 'Sentence is Palindrom!',
            stringIsNotPalindromMessage = "Sentence isn't Palindrom!";

    let userInput = readlineSync.question('Please enter a sentence: ');
    if(isPalindrom(userInput))
        console.log(stringIsPalindromMessage);
    else
        console.log(stringIsNotPalindromMessage);
}) ();

