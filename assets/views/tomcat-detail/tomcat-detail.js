(function () {
    'use strict';

    // Usage:
    // Tomcat detail container
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('tomcatDetail', {
            template: require('./tomcat-detail.html'),
            bindings: {
                instance: '='
            }
        });
})();