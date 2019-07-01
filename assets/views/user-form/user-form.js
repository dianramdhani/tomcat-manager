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

    _.$inject = ['$stateParams', '$scope', '$state', 'UserService', 'UtilService'];
    function _($stateParams, $scope, $state, UserService, UtilService) {
        var $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let roles = await UserService.listUserRoleById().then(_ => _.data.object),
                    canUpdate = $stateParams.credentialId !== null,
                    dataUser;
                if (canUpdate) {
                    dataUser = await UserService.checkUserRole($stateParams.credentialId).then(_ => _.data.object);
                }
                console.log({ roles, dataUser, canUpdate });
                return [roles, dataUser, canUpdate];
            };

            [$scope.roles, $scope.dataUser, $scope.canUpdate] = await getInitialData();
            $scope.$apply();
        };

        $scope.save = async () => {
            let res;
            if ($scope.canUpdate) {
                // update user
            } else {
                // register user
                res = await UserService.userRegister($scope.dataUser);
                UtilService.drlAlert('success', res.data.message);
                $state.go('admin.userManagement');
            }
        };
    }
})();