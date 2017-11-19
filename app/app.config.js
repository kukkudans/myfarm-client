'use strict';

var app=angular.module('farmApp');
  app.config(['$locationProvider' ,'$routeProvider', 'RestangularProvider','$httpProvider', 
    function config($locationProvider, $routeProvider,RestangularProvider, $httpProvider) {
      $locationProvider.hashPrefix('!');
      $httpProvider.defaults.useXDomain = true;
      RestangularProvider.setBaseUrl("http://localhost:8080");

     
      $routeProvider.
       when('/login', {
          templateUrl: '/login/login.html',
          controller : "FarmLoginController",
          controllerAs: 'vm'
        }).
       when('/logout', {
          templateUrl: '/login/login.html',
          controller : "FarmLogoutController",
          controllerAs: 'vm'
        }).
        when('/farmDashboard', {
          templateUrl: '/home/farmDashboard.html',
          controller : "FarmMainController",
          controllerAs: 'vm'
        }).
        when('/farmDashboard/farmMenu', {
          templateUrl: '/home/FarmMenu.html'
        }).
        when('/userProfile', {
          templateUrl: '/user/userProfile.html',
          controller : "UserProfileController",
          controllerAs: 'vm'
        }).when('/addUser', {
          templateUrl: '/user/AddUser.html',
          controller : "AddUserController",
          controllerAs: 'vm'
        }).when('/userProfile/:userid', {
          templateUrl: '/user/userProfile.html',
          controller : "UserProfileController",
          controllerAs: 'vm'
        }).
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/farmDashboard');
    }
  ]);

app.run(function($http, $state, $rootScope, $log, FarmConfManager, ConfigurationResource,$window) {
  ConfigurationResource.getProperties().then(function(response) {
             FarmConfManager.setConf(response.data);
                    
            }, function (response) {
                alert(JSON.stringify(response));
             });
   
 $rootScope.$on('$routeChangeStart', function (event) {
    if(!FarmConfManager.isLoggedIn()){
          $window.location.href = '#!/login';
          // alert("logged out");
      }
        
    });


});

