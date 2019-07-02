window.app = angular.module('TomcatManager', ['ui.router', 'ngCookies', 'datatables']);

// CONFIG
require('./config');

// RUN
(function () {
    'use strict';

    window.app
        .run(Run);

    Run.$inject = ['$rootScope', '$cookies', '$state', '$http'];
    function Run($rootScope, $cookies, $state, $http) {
        $rootScope.globals = angular.fromJson($cookies.get('globals')) || {};
        if (typeof $rootScope.globals.currentUser === 'undefined') {
            $state.go('login');
        } else {
            $http.defaults.headers.common = {
                Authorization: $rootScope.globals.currentUser.object[0],
                'Content-Type': 'application/json'
            };
            $state.go('admin');
        }
    }
})();

// ROUTES
require('../routes/app.route');

// SERVICES
require('../services/util.service');
require('../services/auth.service');
require('../services/AMQ-manager.service');
require('../services/datasource.service');
require('../services/manager.service');
require('../services/user.service');

// COMPONENTS
require('../components/drl-header/drl-header');
require('../components/drl-sidebar/drl-sidebar');
require('../components/drl-footer/drl-footer');
require('../components/drl-pageheader/drl-pageheader');
require('../components/drl-alert/drl-alert');
require('../components/drl-wrapper/drl-wrapper');
require('../components/drl-widget1/drl-widget1');
require('../components/drl-widget2/drl-widget2');
require('../components/drl-loading/drl-loading');
require('../components/drl-page-404/drl-page-404');
require('../components/drl-page-505/drl-page-505');
require('../components/drl-page-500/drl-page-500');
require('../components/drl-page-503/drl-page-503');
require('../components/drl-confirm/drl-confirm');

// VIEWS
require('../views/login/login');
require('../views/container-admin/container-admin');
require('../views/user-setting/user-setting');
require('../views/dashboard/dashboard');
require('../views/tomcat-instance/tomcat-instance');
require('../views/add-tomcat/add-tomcat');
require('../views/tomcat-detail/tomcat-detail');
require('../views/usage-status/usage-status');
require('../views/tomcat-log/tomcat-log');
require('../views/catalina-out/catalina-out');
require('../views/deployment-list/deployment-list');
require('../views/add-deployment/add-deployment');
require('../views/amq-instance/amq-instance');
require('../views/amq-detail/amq-detail');
require('../views/queue-detail/queue-detail');
require('../views/datasource/datasource');
require('../views/datasource-form/datasource-form');
require('../views/user-management/user-management');
require('../views/user-form/user-form');
require('../views/role-management/role-management');
require('../views/role-form/role-form');