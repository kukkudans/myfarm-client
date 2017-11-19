(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('FarmConfManager', FarmConfManager);

    FarmConfManager.$inject = ['Restangular','ConfigurationResource', 'CookieHelper'];

    function FarmConfManager(Restangular, ConfigurationResource, CookieHelper) {

        var conf=null;
        var profile=null;
        var service = {
            init : init,
            getConf : getConf,
            setConf : setConf,
            setProfile : setProfile,
            getProfile : getProfile,
            isLoggedIn : isLoggedIn
        };

        return service;

        init();

        function init() {
            ConfigurationResource.getProperties().then(function(response) {
             conf = response.data;

            }, function (response) {
                alert(JSON.stringify(response));
             });
        }

        function getConf() {
            if(conf==null){
                init();
            }
            return conf;
        }

        function setConf(configuration) {
           conf = configuration;
        }

        function setProfile(prof) {
            profile = prof;
            CookieHelper.setData(prof);
        }

        function getProfile() {
            return profile;
        }

        function isLoggedIn() {
            var loggedIn = (profile != null && profile != undefined);
            if(!loggedIn) {
               var data= CookieHelper.getData();

               if(data != null && data != undefined ) {
                   setProfile(data) ;
                   loggedIn =true;
               }        
            }

            return loggedIn;
        }
       
}
})();