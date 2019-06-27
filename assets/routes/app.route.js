(function () {
    'use strict';

    window.app
        .config(RouteApp);

    RouteApp.$inject = ['$stateProvider'];

    function RouteApp($stateProvider) {
        [
            { name: 'login', url: '/login', component: 'login' },
            { name: 'admin', component: 'containerAdmin' },
            { name: 'admin.dashboard', url: '/dashboard', component: 'dashboard' },
            { name: 'admin.tomcatInstance', url: '/tomcat-instance/{agentId}', component: 'tomcatInstance' },
            { name: 'admin.addTomcat', url: '/tomcat-instance/add-tomcat-instance', component: 'addTomcat' },
            { name: 'admin.amqInstance', url: '/amq-instance/{amqId}', component: 'amqInstance' },
            { name: 'admin.userSetting', url: '/user-setting', component: 'userSetting' },
            { name: 'admin.datasource', url: '/datasource', component: 'datasource' },
            { name: 'admin.datasourceForm', component: 'datasourceForm', params: { datasourceId: { value: null } } },
        ]
            .forEach(state => $stateProvider.state(state));
    }
})();