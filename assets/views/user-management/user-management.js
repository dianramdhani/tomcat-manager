(function () {
    'use strict';

    // Usage:
    // User management container.

    window.app
        .component('userManagement', {
            template: require('./user-management.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$state', 'ManagerService'];
    function _($scope, $state, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            $scope.users = await ManagerService.listCredential().then(_ => _.data.iteratorObject);
            $scope.$apply();
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
            $state.go('admin.userForm', { credentialId: $scope.getSelected()[0].credentialId });
        };

        $scope.delete = () => {

        };
    }
})();