(function () {
    'use strict';

    // Usage:
    // Deployment list container.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('deploymentList', {
            template: require('./deployment-list.html'),
            controller: _
        });

    _.$inject = ['$scope', '$stateParams', 'ManagerService'];
    function _($scope, $stateParams, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.refreshDeploymentList();
        };

        $scope.refreshDeploymentList = async () => {
            $scope.deploymentList = await ManagerService.showMapDeployment($stateParams.agentId, 0, 12).then(_ => _.data.object);
            $scope.$apply();
        };
    }
})();