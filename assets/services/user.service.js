(function () {
    'use strict';

    window.app
        .service('UserService', UserService);

    UserService.$inject = ['CONFIG'];
    function UserService(CONFIG) {
        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/user/register/{rolename}
        function userRegister(rolename) {

        }

        // /manager/user/delete
        function deleteUser() {

        }

        // /manager/user/update/{rolename}
        function userUpdate(rolename) {

        }

        // /manager/user/role/list
        function listUserRole() {

        }

        // /manager/user/role/listbyname
        function listUserRoleById() {

        }

        // /manager/user/role/create/{roleName}
        function createUserRole(roleName) {

        }

        // /manager/user/update/password
        function changeUSerPassword() {

        }

        // /manager/user/{userId}/checkRole
        function checkUserRole(userId) {

        }
    }
})();