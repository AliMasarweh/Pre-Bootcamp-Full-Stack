(function () {
    'use strict';

    // ************************** helper function **************************
    function numberToQuestionTitle (number) {
        return `${numberToOrder.get(number)} Question
-------------------------------------------------`;
    }

    function mapOfScoresAndShuffle(array) {

        let mapOfScores = new Map();
        for(let i = 0; i < array.length; ++i) {
            mapOfScores.set(array[i], i);
        }
    
        function shuffle(a) {
            let j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }
    
        array = shuffle(array);
    
        return [array, mapOfScores];
    }
    
    let readlineSync = require('readline-sync');

    // ************************** static data definition **************************
    const welcomeMessage = `############
Hello! Welcome to the quiz!
############`, 
    resultsMessage = '~~~~~~Quiz results~~~~~~';
    let numberToOrder = new Map(
        [
            [1, 'First'],
            [2, 'Second'],
            [3, 'Third'],
            [4, 'Fourth'],
            [5, 'Fiveth'],
            [6, 'Sixth'],
            [7, 'Seventh'],
            [8, 'Eighth'],
            [9, 'Nineth']
        ]
    );


    let questions = [
        'How many people did you helped last week?',
        'How much have you donated?',
        'How many friends describe you as their best friend?',
        'How many chores you help your parents with?',
        'How many times do you visit your grand-parents per week?'
    ]

    let answers = [
        ['0', '1 or 2', '3 to 6', '7 or more'],
        ['0', '1 to 10', '10 to 30', '30 or more'],
        ['0', '1 or 2', '2 to 4', '5 or more'],
        ['0', '1 or 2', '2 to 5', '6 or more'],
        ['0', '1 or 2', '2 to 3', '4 or more']
    ]

    let questionsToAnswers = new Map();

    for(let i = 0; i < questions.length; i += 1)
        questionsToAnswers.set(questions[i], answers[i]);

    let labels = new Map([
        [0, 'You are bad!'],
        [1, 'You have to work on yourself!'],
        [2, 'You are good!'],
        [3, 'You are the best!']
    ]);

    let sumOfAnswers = 0;

    // ************************** start of the program **************************
    console.log(welcomeMessage);

    for(let i = 0; i < questions.length; i+= 1) {
        console.log(numberToQuestionTitle(i+1));
        let question = questions[i];

        // ************************** unleashing the ninja thingy **************************
        let answers_MapOfScores = mapOfScoresAndShuffle(questionsToAnswers.get(question));
        let answers = answers_MapOfScores[0], mapOfScores = answers_MapOfScores[1];

        sumOfAnswers += mapOfScores.get(answers[
            readlineSync.keyInSelect(answers, question)
        ]);
    }

    console.log(resultsMessage);
    
    console.log(labels.get(Math.floor(sumOfAnswers/questions.length)));
}) ();

