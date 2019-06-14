(function () {
    'use strict';

    window.app
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http', '$q', '$rootScope', '$cookies', '$state'];
    function AuthService($http, $q, $rootScope, $cookies, $state) {
        this.login = login;
        this.logout = logout;

        const url = 'http://192.168.9.19:8081';

        /**
         * Login.
         * @param {String} credentialUsername Required. Username.
         * @param {String} credentialPassword Required. Password.
         */
        function login(credentialUsername, credentialPassword) {
            let q = $q.defer(),
                data = { credentialUsername, credentialPassword };
            $http.post(`${url}/manager/user/login`, data)
                .then(res => {
                    if (res.data.status === 200) {
                        let currentUser = res.data,
                            cookieExp = new Date();
                        $rootScope['globals'] = { currentUser };
                        cookieExp.setDate(cookieExp.getDate() + 7);
                        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
                        q.resolve(res);
                    } else if (res.data.status === 500) {
                        q.reject(res);
                    }
                })
                .catch(err => q.reject(err));
            return q.promise;
        }

        /**
         * Logout.
         */
        function logout() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $state.go('login');
        }
    }
})();