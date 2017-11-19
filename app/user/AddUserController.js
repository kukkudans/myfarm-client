 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('AddUserController', AddUserController);
    
    AddUserController.$inject = ['LoginResource', '$window', 'FarmConfManager', 'UserResource', 'usSpinnerService'];
     
    function AddUserController(LoginResource, $window, FarmConfManager, UserResource, usSpinnerService) {
       
        var vm = this;

        vm.profile = FarmConfManager.getProfile();
        vm.appConf = FarmConfManager.getConf()
        vm.basicInfoEditable = true;
        vm.addressEditable = true;
        vm.errorMessage="";
        vm.successMessage = "";
        vm.userAddressMaster =null;
        vm.userAddress =null;
        vm.states=null;
        vm.addUserForm = null;

        vm.addPhoneNo = addPhoneNo;
        vm.removePhoneNo = removePhoneNo;
        vm.resetForm =resetForm;
        vm.addAddress =addAddress;
        vm.addUser = addUser;
        activate();

        function activate() {
            resetForm();
            countryChanged();
        }


        function removePhoneNo(mobileNo){
          var index = vm.addUserForm.mobiles.indexOf(mobileNo);
           vm.addUserForm.mobiles.splice(index, 1);
        }

        function addPhoneNo(){
          vm.addUserForm.mobiles.push("");
        }

        function resetForm(){
            startSpin();
            vm.addUserForm = {
                "firstName": "",
                "lastName": "",
                "userId": "",
                "email": "",
                "mobiles": [
                    ""
                ]
            };

            vm.userAddress ={
                "userId": "",
                "floorNO": "",
                "houseNo": "",
                "buildingNo": "",
                "landmark": "",
                "addressLine": "",
                "post_office": "",
                "pin": null,
                "district": "",
                "sate": "",
                "country": "INDIA"
            };

            stopSpin();
        }

        function countryChanged(){
          var statesMapList=vm.appConf.states;

          vm.states = statesMapList[vm.userAddress.country];
          if(vm.states.indexOf(vm.userAddress.state) !== -1) {
           vm.userAddress.state ='';
          }
        } 

        function addUser(){
          clearMessages();
          startSpin();  

           UserResource.addUser(vm.addUserForm).then(function(response) {
            addAddress();
            vm.successMessage="User added succfully !!";
            $window.location.href = '#!/userProfile/'+vm.addUserForm.userId;
            
           }, function (response) {
             vm.errorMessage=JSON.stringify(response);
           }).finally(function(){
            stopSpin();
            resetForm();
           });
        }

        function addAddress(){
          
           UserResource.addAddress(vm.addUserForm.userId, vm.userAddress).then(function(response) {
              angular.copy(vm.userAddress,vm.userAddressMaster);
               vm.addressEditable = true;
               vm.successMessage="success";
            }, function (response) {
                vm.errorMessage=JSON.stringify(response);
             }).finally(function() {
                
            });

           
        };

        function clearMessages() {
            vm.successMessage="";
            vm.errorMessage="";
        };

        function startSpin() {
            usSpinnerService.spin('spinner-adduser');
        };

         function stopSpin() {
            usSpinnerService.stop('spinner-adduser');
        };
   }
})();

