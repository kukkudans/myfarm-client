(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('LeaveResource', LeaveResource);

    LeaveResource.$inject = ['Restangular'];

    function LeaveResource(Restangular) {
        var service = {
            applyLeave : applyLeave,
            readLeaveEntries : readLeaveEntries
        };

        return service;
        
        function applyLeave(leaveRequest) {
            
            return Restangular.one('user',leaveRequest.userId).all('leaveentries').post(leaveRequest);
        }

        function readLeaveEntries(userId) {
            return Restangular.one('user',userId).one('leaveentries').get();
        } 

        // function updateAddress(userId, address) {
        //     return Restangular.one('user',userId).one('address').customPUT(address);
        // }

        // function addAddress(userId, address) {
        //     return Restangular.one('user',userId).all('address').post(address);
        // } 

        // function getUserProfiles(userId) {
        //     return Restangular.one('user',userId).get();
        // } 

        // function addUser(user) {
        //     return Restangular.all('user').post(user);
        // }

        // function deleteUser(userId) {
        //     return Restangular.one('user',userId).delete();
        // }

        // function isValidUserId(userId) {
        //     return Restangular.all('user',userId).get();
        // }

        // function getUsers() {
        //     return Restangular.all('users').getList();
        // }

    }
})();