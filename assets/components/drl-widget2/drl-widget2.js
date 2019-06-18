(function () {
    'use strict';

    // Usage:
    // Widget container.

    window.app
        .component('drlWidget2', {
            template: require('./drl-widget2.html'),
            bindings: {
                img: '@',   // Required. Type string. Img src.
                text1: '@', // Required. Type string.
                text2: '@', // Required. Type string.
                text3: '@', // Required. Type string.
                text4: '@', // Required. Type string.
                menu: '='   // Required. Type object. Button menu properties.
            },
        });
})();