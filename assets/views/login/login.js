(function () {
    'use strict';

    // Usage:
    // Loading container.

    window.app
        .component('login', {
            template: require('./login.html'),
            controller: _
        });

    _.$inject = ['$scope', '$state', '$rootScope', 'UtilService', 'AuthService'];
    function _($scope, $state, $rootScope, UtilService, AuthService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            if ($rootScope.globals.currentUser) {
                $state.go('admin');
            }
        };

        $scope.login = () => {
            AuthService.login($scope.dataLogin.credentialUsername, $scope.dataLogin.credentialPassword)
                .then(() => {
                    $state.go('admin');
                })
                .catch(err => {
                    UtilService.drlAlert('danger', err.data.message, '');
                });
        };
    }
})();