(function () {
    'use strict';

    // Usage:
    // User setting container.

    window.app
        .component('userSetting', {
            template: require('./user-setting.html'),
            controller: _
        });

    _.$inject = ['$scope', 'UserService', 'UtilService'];
    function _($scope, UserService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.password = [];
        };

        $scope.update = () => {
            UtilService.drlConfirm('Are you sure want to change your password?', async () => {
                let message = await UserService.changeUSerPassword($scope.password).then(_ => _.data.message);
                UtilService.drlAlert('success', message);
            });
        };
    }
})();