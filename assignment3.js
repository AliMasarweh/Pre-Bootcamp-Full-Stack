(function () {
    'use strict';

    function generateRandomWord() {
        return Word.s_lstOfWords[Math.floor(Math.random()*Word.s_lstOfWords.length)];
    }

    function astrisks(length) {
        let lst = [];
        for (let index = 0; index < length; ++index) {
            lst.push('*');
        }

        return lst.join('');
    }

    function hasBeenGuessed() {
        return this.m_guessedCorrectly === this.m_wordToDisplay.length;
    }

    function geussACharacter(character) {
        let ans = false;
        for (let index = 0; index < this.m_actualWord.length; index++) {
            if(this.m_actualWord[index] === character.toLowerCase() && this.m_wordToDisplay[index] === '*') {
                this.m_wordToDisplay = this.m_wordToDisplay.substr(0, index) + character + this.m_wordToDisplay.substr(index+1, this.m_wordToDisplay.length);
                ans = true;
                ++this.m_guessedCorrectly;
            }
        }

        return ans;
    }


    function displayWord() {
        return this.m_wordToDisplay;
    }

    function Word() {
        this.m_actualWord = generateRandomWord();
        this.m_wordToDisplay = astrisks(this.m_actualWord.length);
        this.geussACharacter = geussACharacter;
        this.hasBeenGuessed = hasBeenGuessed;
        this.displayWord = displayWord;
        this.m_guessedCorrectly = 0;
    }

    Word.s_lstOfWords = [
        'consanguineous', 'psychotomimetic', 'trichotillomania', 'omphaloskepsis', 'myrmecophilous', 'xenotransplantation', 'javascript', 'programming'
    ];



    function readUserGuess() {
        let userInput = this.m_readlineSync.question(HangManGame.s_guessACharacter).toLowerCase();
        if(userInput.length !== 1 || userInput.charCodeAt(0) < 'a'.charAt(0) || userInput.charCodeAt(0) > 'z'.charAt(0)) 
            return false;
        
        return userInput;
    }

    function correctGuess() {
        return 'correct guess';
    }

    function incorrectGuess() {
        return 'incorrect guess';
    }

    function hangManGameLoop() {
        let currentGeuss = 0;
        
        while(!this.m_word.hasBeenGuessed() && currentGeuss < this.m_numOfGuesses) {
            console.log(`You have ${this.m_numOfGuesses - currentGeuss} guesses\nThe word is ${this.m_word.displayWord()}`);
            let character = this.readUserGuess();

            if(character === false) {
                console.log(HangManGame.s_notACharacter);
                continue;
            }

            if(this.m_word.geussACharacter(character)) {
                console.log(this.correctGuess());
            } else {
                console.log(this.incorrectGuess());
                ++currentGeuss;
            }
        }

        if(this.m_word.hasBeenGuessed()) {
            console.log('You win!');
        } else {
            console.log('You lose!');
        }
    }

    function startHangManGame() {
        let figlet = require('figlet');

        figlet.text(HangManGame.s_gameName, {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data);
        });

        this.gameLoop();
    }

    function HangManGame(numOfGuesses = 10) {
        this.m_word = new Word();
        this.m_numOfGuesses = 10;
        this.gameLoop = hangManGameLoop;
        this.startTheGame = startHangManGame;
        this.m_readlineSync = require('readline-sync');
        this.readUserGuess = readUserGuess;
        this.correctGuess = correctGuess; 
        this.incorrectGuess = incorrectGuess;
    }

    HangManGame.s_gameName = 'Hang Man!';
    HangManGame.s_notACharacter = 'Please enter only one character!';

    let game = new HangManGame();

    game.startTheGame();
}) ();
