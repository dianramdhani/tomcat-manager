(function () {
    'use strict';

    // Usage:
    // Page Header container.

    window.app
        .component('drlPageheader', {
            template: require('./drl-pageheader.html'),
            bindings: {
                menuActiveNow: '=',
            },
        });
})();