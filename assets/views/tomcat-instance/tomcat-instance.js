(function () {
    'use strict';

    // Usage:
    // Tomcat instance information.

    window.app
        .component('tomcatInstance', {
            template: require('./tomcat-instance.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', '$timeout', '$q', 'ManagerService', 'UtilService'];
    function _($stateParams, $scope, $timeout, $q, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let instance = await ManagerService.showInstanceByAgentId($stateParams.agentId).then(_ => _.data.object);
                instance['health'] = await ManagerService.checkAgentHealth($stateParams.agentId).then(_ => _.data.object);
                return [instance];
            };

            UtilService.drlLoading(true);
            [$scope.instance] = await getInitialData();
            $scope.$apply();
            UtilService.drlLoading(false);
        };
    }
})();