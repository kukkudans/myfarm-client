 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('FarmLoginController', FarmLoginController);
    
    FarmLoginController.$inject = ['LoginResource', '$window', 'FarmConfManager'];
     
    function FarmLoginController(LoginResource, $window, FarmConfManager) {
       
        var vm = this;
        vm.panelTitle="MyFarm : Sign In  ";

        vm.loginSubmit =loginSubmit;
        vm.reset =reset;


       vm.login = {
        userId :'hari',
        password : 'hari'
       };

       function reset() {
          vm.login.userId = '';
          vm.login.password = '';
       }

       function loginSubmit(){
           LoginResource.authenticate(vm.login).then(function(response) {
                if((response && response.token)){
                  FarmConfManager.init();
                  FarmConfManager.setProfile(response);

                  $window.location.href = '#!/farmDashboard';
                } else {
                  
                alert('Authentication failed');
                }
            }, function (response) {
                alert('Authentication failed');
             }).finally(function() {
                
            });

           
        };
       }
   
})();

