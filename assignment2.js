(function () {
    'use strict';
    // ************************** static data definition **************************
    const welcomeMessage = '///////---------Welcome To War---------\\\\\\\\\\\\\\';
    const enterYourNameMessage = 'Please eneter your name: ';
    const typeOfPlayer = ['What type of mode do you want to play?', '1. Human vs PC', '2. Human vs Human\n'].join('\n')
    const goodbyeMessage = '///////---------Goodbye---------\\\\\\\\\\\\\\';
    const cardMaxValue = 13;
    const suits = ['Spade', 'Heart', 'Diamond', 'Club'];
    const colors = ['Black', 'White'];

    
    // ************************** helper function **************************
    const byingMessage = "I don't play with lairs!! Bye"
    function invalidInputRange(maxMoneyToBet, wrongBet) {
        return `I said between 1 to ${maxMoneyToBet} And you typed ${wrongBet}\n${byingMessage}`;
    }

    function invalidInputType(maxMoneyToBet) {
        return `I said between 1 to ${maxMoneyToBet} And you have entered a non number value\n${byingMessage}`;
    }

    function randomCardsResults(player1, player2, bid) {
        let messageBuilder = [`${player1.name}'s card is ${player1.card.toString()} and ${player2.name}'s card is ${player2.card.toString()}`];
        let roundWinner = null, roundLoser = null;
            
        if(player1.card.number > player2.card.number)  {
            roundWinner = player1;
            roundLoser = player2; 
        }
        else {
            roundWinner = player2;
            roundLoser = player1; 
        }
        
        roundWinner.money += bid;
        roundLoser.money -= bid;
        
        messageBuilder.push(`${roundLoser.name} lost And now he have ${roundLoser.money}`);

        return messageBuilder.join('\n');
    }

    function choicesForPlayer(theGameConintues, endedPremarurely) {
        return [
            'What would like to do next?',
            `${theGameConintues}. Play another round?`,
            `${endedPremarurely}. leave me with my money\n`
        ].join('\n');
    }


    // ***************************** Player Class *****************************
    // Player Methods
    function isBroke() { return this.money === 0; }
    function addMoney(val) { this.money += val; }
    function substractMoney(val) { this.money -= val; }

    // Player Constructor
    function Player(name, isHuman = true, money = Player.defaultMoney) {
        Player.counter += 1;
        this.name = name || `p${Player.counter}`;
        this.money = money;
        this.isHuman = isHuman;
        this.card = null;
        this.isBroke = isBroke;
        this.addMoney = addMoney;
        this.substractMoney = substractMoney;
    }
    // Player Static variabels
    Player.counter = 0;
    Player.defaultMoney = 50;

    // ***************************** Player Class *****************************
    // Card Methods
    function cardToString() {
        return `${ Card.numberToName.get(this.number)} of ${this.suit} ${this.color}`;
    }
    // Card Constructor
    function Card(number, suit, color) {
        this.number = number;
        this.suit = suit;
        this.color = color;
        this.toString = cardToString;
    }

    // Card Static variabels
    Card.numberToName = new Map();
    for(let i = 1; i <= 10; ++i) {
        Card.numberToName.set(i, i);
    }

    Card.numberToName.set(11, 'J');
    Card.numberToName.set(12, 'Q');
    Card.numberToName.set(13, 'K');


    // ***************************** Game Class *****************************
    // Game Methods
    function getRandomCard() {
        function randomIntegerInRange(max, min = 0) {
            return Math.floor(Math.random()*max + min);
        }

        return new Card(randomIntegerInRange(cardMaxValue, 1), suits[randomIntegerInRange(suits.length)], colors[randomIntegerInRange(colors.length)]);
    }

    function askCurrentPlayerHisNextMove() {
        let choice = parseInt(this.gameReadLineSync.question(choicesForPlayer(Game.theGameConintues, Game.endedPremarurely)));
        while(![Game.theGameConintues, Game.endedPremarurely].includes(choice)) {
            console.log('Invalid input!');
            choice = parseInt(this.gameReadLineSync.question(choicesForPlayer(Game.theGameConintues, Game.endedPremarurely)));
        }

        return choice;
    }

    function getCurrentPlayerInput() {
        function askPlayerToBidByName(player, readLineSync) {
            return parseInt(readLineSync.question(`${player.name}, Place your bet please for the next round: 1 to ${player.money}: `));
        }

        let playerToBid = (this.playerTurn === 1)? this.player1: this.player2;
        let bid = askPlayerToBidByName(playerToBid, this.gameReadLineSync);

        // liar's bid handeling
        if(isNaN(bid)) {
            invalidInputType(playerToBid.money);

            return Game.bidOfALiar;
        }
        if(bid <= 0 && bid > playerToBid.money) {
            invalidInputRange(playerToBid.money, bid);

            return Game.bidOfALiar;
        }

        return bid;
    }

    function gameLoop() {
        while(true) {
            let bid = this.getCurrentPlayerInput();

            // ending the game
            if(bid === Game.bidOfALiar) {
                return;
            }

            this.player1.card = getRandomCard(), this.player2.card = getRandomCard();
            while(this.player1.card.number === this.player2.card.number) {
                // to prevent draw situation
                this.player1.card = getRandomCard(), this.player2.card = getRandomCard();
            }

            console.log(randomCardsResults(this.player1, this.player2, bid));

            if(this.player1.isBroke() || this.player2.isBroke())
                break;

            if(this.player1.isHuman && this.player2.isHuman)
                this.playerTurn = 3 - this.playerTurn;

            // maybe should pass the current player as a parameter
            let next = this.askCurrentPlayerHisNextMove();
            if(next === Game.endedPremarurely) {
                console.log(`${this.player1.name}'s money is: ${this.player1.money} And ${this.player2.name}'s money is: ${this.player2.money}`);
                return;
            }
        }

        let brokePlayer = this.player1;
        if(this.player2.isBroke())
            brokePlayer = this.player2;
        
        console.log(`${brokePlayer.name} is broke`);
        console.log(goodbyeMessage);
    }

    function gameInit() {
        console.log(welcomeMessage);
        let mode = parseInt(this.gameReadLineSync.question(typeOfPlayer));
        while(![1, 2].includes(mode)) {
            console.log('invalid input');
            mode = parseInt(this.gameReadLineSync.question(typeOfPlayer));
        }

        this.player1 = new Player(this.gameReadLineSync.question(enterYourNameMessage), true);
        if(mode === Game.humanVsHumanMode) {
            let name = this.gameReadLineSync.question(enterYourNameMessage);
            while(!name.localeCompare(this.player1.name)) {
                name = this.gameReadLineSync.question(enterYourNameMessage);
                console.log('Warning, second player should have a different name!!');
            }
            this.player2 = new Player(name, true);
        }
        else
            this.player2 = new Player((this.player1 === 'P2')? 'Player2': 'P2', false);
    }

    // Game Constructor
    function Game() {
        this.gameReadLineSync = require('readline-sync');
        this.player1 = null;
        this.player2 = null;
        this.getCurrentPlayerInput = getCurrentPlayerInput;
        this.askCurrentPlayerHisNextMove = askCurrentPlayerHisNextMove;
        this.gameLoop = gameLoop;
        this.init = gameInit;
        this.playerTurn = 1;
    }
    // Game Static variables
    Game.bidOfALiar = -1;
    Game.theGameConintues = 1;
    Game.endedPremarurely = 2;
    Game.humanVsHumanMode = 2;


    // ***************************** Main *****************************
    let game = new Game();
    game.init();
    game.gameLoop();

}) ();

