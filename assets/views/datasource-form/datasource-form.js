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

    _.$inject = ['$stateParams', '$scope', 'DatasourceService'];
    function _($stateParams, $scope, DatasourceService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let datasourceInstance = {}, canUpdate = $stateParams.datasourceId !== null;
                if (canUpdate) {
                    datasourceInstance = await DatasourceService.getDatasourceByDatasourceId($stateParams.datasourceId).then(_ => _.data.object);
                }
                return [datasourceInstance, canUpdate];
            };

            [$scope.datasourceInstance, $scope.canUpdate] = await getInitialData();
            $scope.$apply();
            console.log($scope.datasourceInstance, $scope.canUpdate);
        };

        $scope.save = () => {
            console.log($scope.datasourceInstance);
        };
    }
})();