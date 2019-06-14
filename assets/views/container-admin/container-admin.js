(function () {
    'use strict';

    // Usage:
    // Admin container.

    window.app
        .component('containerAdmin', {
            template: require('./container-admin.html'),
            controller: _
        });

    _.$inject = ['$scope'];
    function _($scope) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.menu = [
                {
                    title: 'Dashboard',
                    icon: 'icon ion-ios-keypad',
                    href: 'tes2',
                    active: true
                }
            ];
        };
    }
})();