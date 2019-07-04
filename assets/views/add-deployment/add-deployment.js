(function () {
    'use strict';

    // Usage:
    // Modal for adding deployment.
    // Creates:
    // Call by deployment-list component.

    window.app
        .component('addDeployment', {
            template: require('./add-deployment.html'),
            controller: _,
            bindings: {
                refreshDeploymentList: '&',
            },
        });

    _.$inject = ['$scope', '$stateParams', '$element', 'ManagerService', 'UtilService'];
    function _($scope, $stateParams, $element, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => { };

        $scope.upload = async () => {
            $element.find('#addDeployment').modal('hide');
            UtilService.drlLoading(true);
            let res = await ManagerService.actionDeploy($stateParams.agentId, $scope.deployment);
            res.data = angular.fromJson(res.data);
            UtilService.drlLoading(false);
            if (res.data.status === 200) {
                UtilService.drlAlert('success', res.data.message, '', angular.noop, '#deployment-list-alert');
            } else {
                UtilService.drlAlert('danger', res.data.message, '', angular.noop, '#deployment-list-alert');
            }
            $ctrl.refreshDeploymentList();
        };
    }
})();