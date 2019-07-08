(function () {
    'use strict';

    window.app
        .config(RouteApp);

    RouteApp.$inject = ['$stateProvider'];

    function RouteApp($stateProvider) {
        [
            { name: 'admin.tomcatInstance.deploymentList', component: 'deploymentList' },
            { name: 'admin.tomcatInstance.tomcatLog', component: 'tomcatLog' },
            { name: 'admin.tomcatInstance.catalinaOut', component: 'catalinaOut' },
        ]
            .forEach(state => $stateProvider.state(state));
    }
})();