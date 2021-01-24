(function () {
    'use strict';

    function joinTwoArrays(array1, array2) {
        let ans = [];

        array1.forEach(element => {
            ans.push(element);
        });

        array2.forEach(element => {
            ans.push(element);
        });

        return ans;
    }
}) ();
