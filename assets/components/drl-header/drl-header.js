(function () {
    'use strict';

    // Usage:
    // Header container.

    window.app
        .component('drlHeader', {
            template: require('./drl-header.html'),
            controller: drl
        });

    drl.$inject = ['$scope', 'AuthService'];
    function drl($scope, AuthService) {
        $scope.logout = () => {
            AuthService.logout();
        };
    }
})();