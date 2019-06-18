(function () {
    'use strict';

    // Usage:
    // Widget container.
    // Creates:
    // Transclude menu section.

    window.app
        .component('drlWidget2', {
            template: require('./drl-widget2.html'),
            transclude: true,
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