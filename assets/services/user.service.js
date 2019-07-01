(function () {
    'use strict';

    window.app
        .service('UserService', UserService);

    UserService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function UserService($http, CONFIG, UtilService) {
        this.listUserRoleById = listUserRoleById;
        this.checkUserRole = checkUserRole;
        this.userRegister = userRegister;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/user/register/{rolename}
        function userRegister(dataUser) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/user/register/${dataUser.userRoleName}`, {
                credentialEmail: dataUser.credentialEmail,
                credentialPassword: dataUser.credentialPassword,
                credentialUsername: dataUser.credentialUsername
            }));
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
            return UtilService.showAlertWhenError($http.get(`${url}/manager/user/role/listbyname`));
        }

        // /manager/user/role/create/{roleName}
        function createUserRole(roleName) {

        }

        // /manager/user/update/password
        function changeUSerPassword() {

        }

        // /manager/user/{userId}/checkRole
        function checkUserRole(userId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/user/${userId}/checkRole`));
        }
    }
})();