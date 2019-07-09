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
        this.changeUSerPassword = changeUSerPassword;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        function userRegister(dataUser) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/user/register/${dataUser.userRoleName}`, {
                credentialEmail: dataUser.credentialEmail,
                credentialPassword: dataUser.credentialPassword,
                credentialUsername: dataUser.credentialUsername
            }));
        }

        function deleteUser(dataUser) {
            return UtilService.showAlertWhenError($http.delete(`${url}/manager/user/delete`, { data: dataUser }));
        }

        function userUpdate(dataUser) {
            return UtilService.showAlertWhenError($http.put(`${url}/manager/user/update/${dataUser.userRoleName}`, {
                credentialActive: dataUser.credentialActive,
                credentialDateCreated: dataUser.credentialDateCreated,
                credentialEmail: dataUser.credentialEmail,
                credentialId: dataUser.credentialId,
                credentialUsername: dataUser.credentialUsername
            }));
        }

        function listUserRole() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/user/role/list`));
        }

        function listUserRoleById() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/user/role/listbyname`));
        }

        // /manager/user/role/create/{roleName}
        function createUserRole(roleName) {

        }

        // /manager/user/update/password
        function changeUSerPassword(password) {
            return UtilService.showAlertWhenError($http.put(`${url}/manager/user/update/password`, password));
        }

        function checkUserRole(userId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/user/${userId}/checkRole`));
        }
    }
})();