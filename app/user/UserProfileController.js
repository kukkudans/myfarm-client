 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('UserProfileController', UserProfileController);
    
    UserProfileController.$inject = ['LoginResource', '$window', 'FarmConfManager', 'UserResource', '$route', 'usSpinnerService'];
     
    function UserProfileController(LoginResource, $window, FarmConfManager, UserResource, $route, usSpinnerService) {
       
        var vm = this;
        vm.userId = null;
        vm.profile = {user :''};
        vm.appConf = FarmConfManager.getConf()
        vm.userProfile =null;
        vm.basicInfoEditable = true;
        vm.addressEditable = true;
        vm.errorMessage="";
        vm.successMessage = "";
        vm.userAddressMaster =null;
        vm.userAddress =null;
        vm.states=null;


        vm.editProfile = editProfile;
        vm.editAddress = editAddress;
        vm.reset = reset;
        vm.cancel = cancel;
        vm.updateBasicProfile = updateBasicProfile;
        vm.addPhoneNo = addPhoneNo;
        vm.removePhoneNo = removePhoneNo;
        vm.countryChanged = countryChanged;
        vm.cancelAddressEdit = cancelAddressEdit;
        vm.resetAddressForm = resetAddressForm;
        vm.updateAddress = updateAddress;

        activate();

        function activate() {
          startSpin();
          if($route.current.params.userid) {

              vm.userId = $route.current.params.userid;
                   
              UserResource.getUserProfiles(vm.userId).then(function(response) {
                vm.profile.user =response.data;
                vm.userProfile =angular.copy(response.data);
                
              }, function (response) {
                  vm.errorMessage=JSON.stringify(response);
               }).finally(function() {
                   countryChanged();
              });
          } else {
            vm.profile = FarmConfManager.getProfile();
            vm.userProfile =angular.copy(vm.profile.user);
            vm.userId =vm.profile.user.userId;
          }

          UserResource.getAddress(vm.userId).then(function(response) {
            vm.userAddressMaster=angular.copy(response.data);
             vm.userAddress = response.data;

            }, function (response) {
                vm.errorMessage=JSON.stringify(response);
             }).finally(function() {
                 countryChanged();
            });
         
         stopSpin();
        }

        function countryChanged(){
          var statesMapList=vm.appConf.states;

          vm.states = statesMapList[vm.userAddress.country];
          if(vm.states.indexOf(vm.userAddress.state) !== -1) {
           vm.userAddress.state ='';
          }
        } 

        function removePhoneNo(mobileNo){
          var index = vm.userProfile.mobiles.indexOf(mobileNo);
           vm.userProfile.mobiles.splice(index, 1);
        }

        function addPhoneNo(){
          vm.userProfile.mobiles.push("");
        }

        function editProfile() {
          vm.basicInfoEditable = false;
        }
        function editAddress() {
          vm.addressEditable = false;
        }

        function reset() {
          angular.copy(vm.profile.user,vm.userProfile);
        }

        function resetAddressForm() {
          angular.copy(vm.userAddressMaster,vm.userAddress);
        }

        function cancel() {
          reset();
          vm.basicInfoEditable = true;
        }
        
        function startSpin() {
            usSpinnerService.spin('spinner-userprofile');
        };

         function stopSpin() {
            usSpinnerService.stop('spinner-userprofile');
        };
        function cancelAddressEdit() {
          resetAddressForm();
          vm.addressEditable = true;
        }

        function resetMessage() {
            vm.errorMessage="";
            vm.successMessage = "";
        }


       function updateBasicProfile(){
          startSpin();
           UserResource.updateProfile(vm.userProfile).then(function(response) {
              angular.copy(vm.userProfile,vm.profile.user);
               vm.basicInfoEditable = true;
               vm.successMessage="success";
            }, function (response) {
                vm.errorMessage=JSON.stringify(response);
             }).finally(function() {
               stopSpin(); 
            });

           
        };

        function updateAddress(){
          startSpin();
           UserResource.updateAddress(vm.userId, vm.userAddress).then(function(response) {
              angular.copy(vm.userAddress,vm.userAddressMaster);
               vm.addressEditable = true;
               vm.successMessage="success";
            }, function (response) {
                vm.errorMessage=JSON.stringify(response);
             }).finally(function() {
                stopSpin();
            });

           
        };
   }
})();

