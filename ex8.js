(function () {
    'use strict';
    
    function hasDigit(number, digit) {
        while(number > 0) {
            if(number % 10 === digit)
                return true;
            
            number /= 10;
        }

        return false;
    }

    for(let i = 1; i <= 100; i += 1) {
        if(i%7 && !hasDigit(i, 7))
            console.log(i);
        else
            console.log('BOOM');
    }
}) ();

