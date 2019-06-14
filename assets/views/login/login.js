(function () {
    'use strict';

    // Usage:
    // Loading container.

    window.app
        .component('login', {
            template: require('./login.html'),
            controller: _
        });

    _.$inject = ['$scope', 'UtilService', 'AuthService'];
    function _($scope, UtilService, AuthService) {
        $scope.login = () => {
            AuthService.login($scope.dataLogin.credentialUsername, $scope.dataLogin.credentialPassword)
                .then(res => {
                    console.log({ res });
                })
                .catch(err => {
                    UtilService.drlAlert('danger', err.data.message, '');
                });
        };
    }
})();