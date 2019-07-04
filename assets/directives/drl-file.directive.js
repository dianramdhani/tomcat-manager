(function () {
    'use strict';

    window.app
        .directive('drlFile', drlFile);

    drlFile.$inject = [];
    function drlFile() {
        // Usage:
        // For input type file.
        // Creates:
        // File cant read in ng-model
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            element.on('change', () => {
                let files = element[0].files[0];
                ngModel.$setViewValue(files);
                element.next('.custom-file-label').html(files.name);
            });
        }
    }
})();