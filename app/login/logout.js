 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('FarmLogoutController', FarmLogoutController);
    
    FarmLogoutController.$inject = ['LoginResource', '$window', 'FarmConfManager', 'CookieHelper'];
     
    function FarmLogoutController(LoginResource, $window, FarmConfManager, CookieHelper) {
       
        var vm = this;
        logout();

       function logout(){
           LoginResource.logout().then(function(response) {
               
            }, function (response) {
                alert('Logout  failed');
             }).finally(function() {
               FarmConfManager.setProfile(null);
               CookieHelper.setData(null);
               $window.location.href = '#!/login'; 
            });

           
        };
       }
   
})();

