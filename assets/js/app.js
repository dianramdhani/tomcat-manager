window.app = angular.module('TomcatManager', ['ui.router', 'ngCookies']);

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
                Authorization: $rootScope.globals.currentUser.object[0]
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

// VIEWS
require('../views/login/login');
require('../views/container-admin/container-admin');
require('../views/user-setting/user-setting');
require('../views/dashboard/dashboard');
require('../views/tomcat-instance/tomcat-instance');
require('../views/instance-detail/instance-detail');
require('../views/usage-status/usage-status');
require('../views/instance-log/instance-log');
require('../views/catalina-out/catalina-out');