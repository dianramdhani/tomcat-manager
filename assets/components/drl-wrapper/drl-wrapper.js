(function () {
    'use strict';

    // Usage:
    // Wraps all containers, which consist of a header, sidebar, alert container, and footer.
    // Creates:
    // Transclude the view section. And binding all menu.

    window.app
        .component('drlWrapper', {
            template: require('./drl-wrapper.html'),
            controller: drl,
            transclude: true,
            bindings: {
                menu: '=',
            }
        });

    drl.$inject = ['$timeout', '$document'];
    function drl($timeout, $document) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $timeout(() => {
                let libSlimElement = document.createElement('script');
                libSlimElement.src = './assets/lib/slim/js/slim.js';
                libSlimElement.id = 'slim-lib';
                angular.element(`#${libSlimElement.id}`).remove();
                angular.element($document[0].body).append(libSlimElement);
            });
        };
    }
})();