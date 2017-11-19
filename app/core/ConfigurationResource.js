(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('ConfigurationResource', ConfigurationResource);

    ConfigurationResource.$inject = ['Restangular'];

    function ConfigurationResource(Restangular) {
        var service = {
            getProperties : getProperties
        };

        return service;
        
        function getProperties() {
            return Restangular.one('/properties').get();
        }
}
})();