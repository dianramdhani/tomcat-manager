(function () {
    'use strict';

    // Usage:
    // Table container for list of role.
    // Creates:
    // Call by user-management component.

    window.app
        .component('roleManagement', {
            template: require('./role-management.html'),
            controller: _
        });

    _.$inject = ['$scope', 'UserService', 'UtilService'];
    function _($scope, UserService, UtilService) {
        /**
         * Refresh all data in table.
         */
        const refreshData = async () => {
            $scope.roles = await UserService.listUserRole().then(_ => _.data.iteratorObject);
            $scope.$apply();
        };

        let $ctrl = this;
        $ctrl.$onInit = async () => {
            await refreshData();
            UtilService.DTZeroConfig('#table-role-management', {
                columnDefs: [{
                    targets: 0,
                    orderable: false
                }],
                order: [[1, 'asc']]
            });
        };

        $scope.update = () => {
            console.log('update');
        };

        $scope.delete = () => {
            console.log('delete');
        };
    }
})();