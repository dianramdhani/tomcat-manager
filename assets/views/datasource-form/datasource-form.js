(function () {
    'use strict';

    // Usage:
    // DataSource form container.
    // Creates:
    // Call by datasource component.

    window.app
        .component('datasourceForm', {
            template: require('./datasource-form.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', '$state', '$timeout', 'DatasourceService', 'UtilService'];
    function _($stateParams, $scope, $state, $timeout, DatasourceService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let datasourceInstance = { type: 'javax.sql.DataSource' },  // default value
                    canUpdate = $stateParams.datasourceId !== null;
                if (canUpdate) {
                    datasourceInstance = await DatasourceService.getDatasourceByDatasourceId($stateParams.datasourceId).then(_ => _.data.object);
                }
                return [datasourceInstance, canUpdate];
            };

            $timeout(async () => {
                [$scope.datasourceInstance, $scope.canUpdate] = await getInitialData();
                $scope.$apply();
            });
        };

        $scope.save = async () => {
            let message;
            if ($scope.canUpdate) {
                message = await DatasourceService.updateDatasource($scope.datasourceInstance).then(_ => _.data.message);
            } else {
                message = await DatasourceService.addDatasource($scope.datasourceInstance).then(_ => _.data.message);
            }
            UtilService.drlAlert('success', message);
            $state.go('admin.datasource');
        };
    }
})();