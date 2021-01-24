(function () {
    'use strict';
    var readlineSync = require('readline-sync');

    let sentence = readlineSync.question('Please enter a sentence: ');
    let toBeReplacedStr = ' ', replacingStr = '*';

    sentence = sentence.split(toBeReplacedStr).join(replacingStr)

    console.log(`The sentence after replacing "${toBeReplacedStr}" with "${replacingStr}"\n${sentence}`)
}) ();

