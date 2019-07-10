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
            { name: 'admin.tomcatForm', url: '/tomcat-instance', component: 'tomcatForm', params: { agentId: { value: null } } },
            { name: 'admin.amqInstance', url: '/amq-instance/{amqId}', component: 'amqInstance' },
            { name: 'admin.amqForm', url: '/amq-instance', component: 'amqForm', params: { amqId: { value: null } } },
            { name: 'admin.userSetting', url: '/user-setting', component: 'userSetting' },
            { name: 'admin.datasource', url: '/datasource', component: 'datasource' },
            { name: 'admin.datasourceForm', component: 'datasourceForm', params: { datasourceId: { value: null } } },
            { name: 'admin.userManagement', url: '/user-management', component: 'userManagement' },
            { name: 'admin.userForm', component: 'userForm', params: { dataUser: { value: null } } },
            { name: 'admin.roleManagement', url: '/user-management/role-management', component: 'roleManagement' },
            { name: 'admin.workManager', url: '/work-manager', component: 'workManager' },
        ]
            .forEach(state => $stateProvider.state(state));
    }
})();