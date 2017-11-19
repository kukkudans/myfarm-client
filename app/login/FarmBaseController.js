 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('FarmBaseController', FarmBaseController);
    
    FarmBaseController.$inject = ['$window', 'FarmConfManager'];
     
    function FarmBaseController( $window, FarmConfManager) {
       
        var vm = this;
        vm.userName=null;
        vm.isLoggedIn = isLoggedIn;

        activate();

        function activate() {
          FarmConfManager.init();
        }

        function isLoggedIn(){
          var isLoggedIn =FarmConfManager.isLoggedIn();
          if (isLoggedIn) {
              var profile = FarmConfManager.getProfile();
              vm.userName = profile.user.firstName;
          }
          return isLoggedIn;
        }

 }     
})();

