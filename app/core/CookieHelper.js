(function () {
    'use strict';
     angular
        .module('farmApp')
        .factory('CookieHelper', CookieHelper);
        CookieHelper.$inject = ['$window','$rootScope'];

    function CookieHelper($window, $rootScope) {

              angular.element($window).on('storage', function(event) {
                if (event.key === 'secret') {
                  $rootScope.$apply();
                }
              });
              return {
                setData: function(key) {
                     // var storedKeys = JSON.parse($window.localStorage && $window.localStorage.getItem('secret'));
                     // var node ={'key' : key};
                     // if(storedKeys === null || storedKeys.length === 0){
                     //    storedKeys = [];
                     // }
                     // for (var i = storedKeys.length - 1; i >= 0; i--) {

                     //    if(angular.equals(key,storedKeys[i].key)){
                     //        return this;
                     //    }
                     // }
                     
                        
                     //  storedKeys.push(node);
                     var data=null;
                     if(null == key || key == undefined) {
                      $window.localStorage && $window.localStorage.removeItem('secret');
                     } else {
                         data=   JSON.stringify(key);
                         $window.localStorage && $window.localStorage.setItem('secret',data);
                     }
                      return this;
                },
                getData: function() {
               
                  return JSON.parse($window.localStorage && $window.localStorage.getItem('secret'));
                }
              };
    }

})();