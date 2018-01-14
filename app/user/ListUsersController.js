 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('ListUsersController', ListUsersController);
    
    ListUsersController.$inject = ['LoginResource', '$window', 'FarmConfManager', 'UserResource', 'usSpinnerService', 'NgTableParams'];
     
    function ListUsersController(LoginResource, $window, FarmConfManager, UserResource, usSpinnerService, NgTableParams) {
       
        var vm = this;

        vm.userList = null;
        vm.users = [{name: "Moroni", age: 50} /*,*/];
        vm.tableParams = new NgTableParams({}, { dataset: vm.userList});
        vm.successMessage =null;
        vm.errorMessage =null;

        activate();

        function activate() {
          getUsers();
        }

        function getUsers(){
          startSpin();  

           UserResource.getUsers().then(function(response) {
            vm.userList = response;
            vm.tableParams = new NgTableParams({}, { dataset: vm.userList});
           }, function (response) {
             vm.errorMessage=JSON.stringify(response);
           }).finally(function(){
            stopSpin();
           });
        }

        function clearMessages() {
            vm.successMessage="";
            vm.errorMessage="";
        };

        function startSpin() {
            usSpinnerService.spin('spinner-listuser');
        };

         function stopSpin() {
            usSpinnerService.stop('spinner-listuser');
        };
        

   }
})();

