(function () {
    'use strict';

    // Usage:
    // Form for adding tomcat instance.

    window.app
        .component('tomcatForm', {
            template: require('./tomcat-form.html'),
            controller: _
        });

    _.$inject = ['$scope'];
    function _($scope) {
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

        $scope.save = () => {
            console.log($scope.agent);
        };
    }
})();