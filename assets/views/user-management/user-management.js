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
        $ctrl.$onInit = async () => {
            await refreshData();
            UtilService.DTZeroConfig('#table-user-management', {
                columnDefs: [{
                    targets: 0,
                    orderable: false
                }],
                order: [[1, 'asc']]
            });
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

        $scope.edit = () => {
            $state.go('admin.userForm', { dataUser: $scope.getSelected()[0] });
        };

        $scope.delete = () => {
            UtilService.drlConfirm('Are you sure want to delete these records?', async () => {
                // remove attribut select
                let dataUser = $scope.getSelected().map(user => {
                    let { select, ...res } = user;
                    return res;
                }), message = await UserService.deleteUser(dataUser).then(_ => _.data.message);
                UtilService.drlAlert('success', message);
                refreshData();
            });
        };
    }
})();