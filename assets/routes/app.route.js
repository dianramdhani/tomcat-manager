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
        ]
            .forEach(state => $stateProvider.state(state));
    }
})();