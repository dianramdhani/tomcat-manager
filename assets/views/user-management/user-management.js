(function () {
    'use strict';

    // Usage:
    // User management container.

    window.app
        .component('userManagement', {
            template: require('./user-management.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$state', 'ManagerService', 'UtilService', 'UserService'];
    function _($scope, $state, ManagerService, UtilService, UserService) {
        /**
         * Refresh all data in table.
         */
        const refreshData = async () => {
            $scope.users = await ManagerService.listCredential().then(_ => _.data.iteratorObject);
            $scope.$apply();
        };

        let $ctrl = this;
        $ctrl.$onInit = () => {
            refreshData();
        };

        $scope.getSelected = () => {
            let selected = [];
            if ($scope.hasOwnProperty('users')) {
                selected = $scope.users.filter(({ select }) => select === true);
                $scope.selectAll = selected.length === $scope.users.length;
            }
            return selected;
        };

        $scope.changeAll = () => {
            if ($scope.selectAll) {
                angular.forEach($scope.users, (user) => user['select'] = false);
            } else {
                angular.forEach($scope.users, (user) => user['select'] = true);
            }
        };

        $scope.newRole = () => {

        };

        $scope.edit = () => {
            $state.go('admin.userForm', { dataUser: $scope.getSelected()[0] });
        };

        $scope.delete = () => {
            UtilService.drlConfirm('Are you sure want to delete these records?', async () => {
                // remove attribut select
                let dataUser = $scope.getSelected().map(user => {
                    let { select, ...res } = user;
                    return res;
                }), res = await UserService.deleteUser(dataUser);

                if (res.data.status === 200) {
                    UtilService.drlAlert('success', res.data.message);
                    refreshData();
                }
            });
        };
    }
})();