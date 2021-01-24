(function () {
    'use strict';
    
    let readlineSync = require('readline-sync');

    let nonKosher = 'Non Kosher', kosher = 'Kosher', kashrutLemehadrin = 'Kashrut Lemehadrin';
    let nonKosherRestaurants = ['Vast Side', 'Geshen', 'Jashka Desingov'], 
            kosherRestaurants = ['Armando', 'Bega'],
            kashrutLemehadrinRestaurants = ['Daka', 'Karman', 'Meat Kitchen'];
 
    // Wait for user's response.
    let categoryToRestaurant = new Map(
        [
            [nonKosher, nonKosherRestaurants],
            [kosher, kosherRestaurants],
            [kashrutLemehadrin, kashrutLemehadrinRestaurants],
        ]
    );

    let stoppingExecutionMessage = 'stop execution';
    let messagesForUser = {
        numberOfPeopleGoingWith: 'How many people are you going with?\n',
        shouldItBeKosher: 'Should it be Kosher?\n',
        shouldBeKashrutLemehadrin: 'should it be Kashrut Lemehadrin?\n'

    };
    let arrayOfValidAnswers = ['y', 'n'];

    let resevation = {
        catergory: null,
        numberOfPeople: 0
    }

    resevation.numberOfPeople = parseInt(readlineSync.question(messagesForUser.numberOfPeopleGoingWith));

    if(isNaN(resevation.numberOfPeople) || resevation.numberOfPeople < 1)
        throw stoppingExecutionMessage;

    let answer = readlineSync.question(messagesForUser.shouldItBeKosher);
    if(!arrayOfValidAnswers.includes(answer)) 
        throw stoppingExecutionMessage;

    if(answer === 'y') {
        let answer = readlineSync.question(messagesForUser.shouldBeKashrutLemehadrin);
        if(!arrayOfValidAnswers.includes(answer)) 
            throw stoppingExecutionMessage;

        if(answer === 'y')
            resevation.catergory = kashrutLemehadrin;
        else
        resevation.catergory = kosher;

    } else
    resevation.catergory = nonKosher;


    let restaurants = categoryToRestaurant.get(resevation.catergory);
    let restaurantNumber = readlineSync.keyInSelect(restaurants, 'Which restaurant?');

    if(restaurantNumber === -1)
        console.log('Canceled!');
    else
        console.log(`Reserving for ${resevation.numberOfPeople} people(s) at restuarant ${restaurants[restaurantNumber]}!`);
}) ();

