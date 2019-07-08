(function () {
    'use strict';

    // Usage:
    // User setting container.

    window.app
        .component('userSetting', {
            template: require('./user-setting.html'),
            controller: _
        });

    _.$inject = ['$scope'];
    function _($scope) {
        let $ctrl = this;
        $ctrl.$onInit = () => { };

        $scope.update = () => {
            console.log('update');
        };
    }
})();