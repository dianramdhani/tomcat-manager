(function () {
    'use strict';

    window.app
        .service('UserService', UserService);

    UserService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function UserService($http, CONFIG, UtilService) {
        this.listUserRoleById = listUserRoleById;
        this.checkUserRole = checkUserRole;
        this.userRegister = userRegister;
        this.userUpdate = userUpdate;
        this.deleteUser = deleteUser;
        this.listUserRole = listUserRole;

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
        function deleteUser(dataUser) {
            return UtilService.showAlertWhenError($http.delete(`${url}/manager/user/delete`, { data: dataUser }));
        }

        // /manager/user/update/{rolename}
        function userUpdate(dataUser) {
            return UtilService.showAlertWhenError($http.put(`${url}/manager/user/update/${dataUser.userRoleName}`, {
                credentialActive: dataUser.credentialActive,
                credentialDateCreated: dataUser.credentialDateCreated,
                credentialEmail: dataUser.credentialEmail,
                credentialId: dataUser.credentialId,
                credentialUsername: dataUser.credentialUsername
            }));
        }

        // /manager/user/role/list
        function listUserRole() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/user/role/list`));
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