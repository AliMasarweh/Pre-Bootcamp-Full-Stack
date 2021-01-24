(function () {
    'use strict';

    function reverseList(array1) {
        let ans = [];

        array1.forEach(element => {
            ans.unshift(element);
        });

        return ans;
    }
}) ();
