(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('LoginResource', LoginResource);

    LoginResource.$inject = ['Restangular'];

    function LoginResource(Restangular) {
        var service = {
            authenticate : authenticate,
            logout : logout
        };

        return service;
        
        function authenticate(loginRequest) {
            return Restangular.all('/user/auth').post(loginRequest);
        }

        function logout() {
            return Restangular.all('/user/logOff').post();
        }
    }
})();