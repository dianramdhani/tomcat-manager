window.app = angular.module('TomcatManager', ['ui.router', 'ngCookies']);

// RUN
(function () {
    'use strict';

    window.app
        .run(Run);

    Run.$inject = ['$rootScope', '$cookies', '$state'];
    function Run($rootScope, $cookies, $state) {
        $rootScope.globals = angular.fromJson($cookies.get('globals')) || {};
        if (typeof $rootScope.globals.currentUser === 'undefined') {
            $state.go('login');
        } else {
            $state.go('admin');
        }
    }
})();

// ROUTES
require('../routes/app.route');

// SERVICES
require('../services/util.service');
require('../services/auth.service');

// COMPONENTS
require('../components/drl-header/drl-header');
require('../components/drl-sidebar/drl-sidebar');
require('../components/drl-footer/drl-footer');
require('../components/drl-pageheader/drl-pageheader');
require('../components/drl-alert/drl-alert');
require('../components/drl-wrapper/drl-wrapper');
require('../components/drl-widget1/drl-widget1');
require('../components/drl-loading/drl-loading');
require('../components/drl-page-404/drl-page-404');
require('../components/drl-page-505/drl-page-505');
require('../components/drl-page-500/drl-page-500');
require('../components/drl-page-503/drl-page-503');

// VIEWS
require('../views/login/login');
require('../views/container-admin/container-admin');
require('../views/dashboard/dashboard');
require('../views/user-setting/user-setting');