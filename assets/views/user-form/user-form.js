(function () {
    'use strict';

    // Usage:
    // Form register or update.
    // Creates:
    // Call by user-management component.

    window.app
        .component('userForm', {
            template: require('./user-form.html'),
            controller: _,
        });

    _.$inject = ['$stateParams', '$scope', '$state', '$timeout', 'UserService', 'UtilService'];
    function _($stateParams, $scope, $state, $timeout, UserService, UtilService) {
        var $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let roles = await UserService.listUserRoleById().then(_ => _.data.object),
                    canUpdate = $stateParams.dataUser !== null,
                    dataUser;
                if (canUpdate) {
                    dataUser = Object.assign($stateParams.dataUser, await UserService.checkUserRole($stateParams.dataUser.credentialId).then(_ => _.data.object));
                }
                return [roles, dataUser, canUpdate];
            };

            $timeout(async () => {
                [$scope.roles, $scope.dataUser, $scope.canUpdate] = await getInitialData();
                $scope.$apply();
            });
        };

        $scope.save = async () => {
            let res;

            if ($scope.canUpdate) {
                res = await UserService.userUpdate($scope.dataUser);
            } else {
                res = await UserService.userRegister($scope.dataUser);
            }

            if (res.status === 200) {
                UtilService.drlAlert('success', res.data.message);
                $state.go('admin.userManagement');
            }
        };
    }
})();