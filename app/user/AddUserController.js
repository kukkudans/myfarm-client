 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('AddUserController', AddUserController);
    
    AddUserController.$inject = ['LoginResource', '$window', 'FarmConfManager', 'UserResource', 'usSpinnerService', '$filter'];
     
    function AddUserController(LoginResource, $window, FarmConfManager, UserResource, usSpinnerService, $filter) {
       
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
        vm.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.opened = false;
        vm.maxDate = new Date();
        vm.selectedDate =vm.maxDate;

        vm.addPhoneNo = addPhoneNo;
        vm.removePhoneNo = removePhoneNo;
        vm.resetForm =resetForm;
        vm.addAddress =addAddress;
        vm.addUser = addUser;
        vm.cancel = cancel;
        vm.disabled=disabled;
        vm.open =open;
        vm.getDayClass = getDayClass;
        vm.setDOB = setDOB;

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
                "dob":vm.maxDate,
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

        function setDOB() {
           
           if(angular.isDate(vm.selectedDate)){
               vm.addUserForm.dob = $filter('date')(vm.selectedDate, 'yyyy-MM-dd');
              
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

        // date picker methods
        function cancel() {
          $state.go('app');
        }

        function disabled(date, mode) {
           return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        function getDayClass(data) {
          var date = data.date,
          mode = data.mode;
          if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);
            for (var i = 0; i < $scope.events.length; i++) {
              var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
              if (dayToCheck === currentDay) {
                return $scope.events[i].status;
              }
            }
          }
          return '';
        }
        

         function open($event) {
           $event.preventDefault();
           $event.stopPropagation();

            vm.opened = !vm.opened;
         };
         // date picker methods
   }
})();

