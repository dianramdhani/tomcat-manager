(function () {
    'use strict';

    // Usage:
    // Form for adding tomcat instance.

    window.app
        .component('tomcatForm', {
            template: require('./tomcat-form.html'),
            controller: _
        });

    _.$inject = ['$scope', 'ManagerService'];
    function _($scope, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            // if new
            $scope.agent = {
                agentPort: 8080,
                instanceShutdownPort: 8085,
                instanceAJPPort: 8009,
                instanceRedirectPort: 8443,
                instanceJVMArgs: '-Xmx512m'
            };
        };

        $scope.save = async () => {
            let res = await ManagerService.createAgent($scope.agent);
            console.log($scope.agent, res);
        };
    }
})();