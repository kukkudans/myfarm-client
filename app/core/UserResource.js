(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('UserResource', UserResource);

    UserResource.$inject = ['Restangular'];

    function UserResource(Restangular) {
        var service = {
            updateProfile : updateProfile,
            getAddress : getAddress,
            addAddress : addAddress, 
            updateAddress : updateAddress, 
            addUser : addUser,
            getUserProfiles : getUserProfiles,
            getUsers : getUsers,
            deleteUser : deleteUser,
            isValidUserId : isValidUserId
        };

        return service;
        
        function updateProfile(userProfile) {
            
            return Restangular.one('user').customPUT(userProfile);
        }

        function getAddress(userId) {
            return Restangular.one('user',userId).one('address').get();
        } 

        function updateAddress(userId, address) {
            return Restangular.one('user',userId).one('address').customPUT(address);
        }

        function addAddress(userId, address) {
            return Restangular.one('user',userId).all('address').post(address);
        } 

        function getUserProfiles(userId) {
            return Restangular.one('user',userId).get();
        } 

        function addUser(user) {
            return Restangular.all('user').post(user);
        }

        function deleteUser(userId) {
            return Restangular.one('user',userId).delete();
        }

        function isValidUserId(userId) {
            return Restangular.all('user',userId).get();
        }

        function getUsers() {
            return Restangular.all('users').getList();
        }

    }
})();