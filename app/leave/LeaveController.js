 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('LeaveController', LeaveController);
    
    LeaveController.$inject = ['$window', 'FarmConfManager', '$route', 'usSpinnerService', '$filter', 'LeaveResource', 'NgTableParams'];
     
    function LeaveController( $window, FarmConfManager,  $route, usSpinnerService, $filter, LeaveResource, NgTableParams) {
       
        var vm = this;
        vm.userId = null;
        vm.firstName = null;
        vm.lastName = null;
        vm.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.openedS = false;
        vm.openedE = false;
        vm.today = new Date();
        vm.selectedStartDate =vm.today;
        vm.selectedEndDate =vm.today;
        vm.leaveForm = null;
        vm.leaveEntries = [];
        vm.tableParams = new NgTableParams({}, { dataset: vm.leaveEntries});

        vm.datepickerOptions =  {
           
           initDate: vm.maxDate,
           maxDate: vm.maxDate,
           showWeeks:"false"
        };


       
        //methods
        vm.cancel = cancel;
        vm.disabled=disabled;
        vm.open1 =open1;
        vm.open2 =open2;
        vm.getDayClass = getDayClass;
        vm.setStartDate = setStartDate;
        vm.setEndDate = setEndDate;
        vm.addLeaveEntry =addLeaveEntry;

        activate();
        function activate() {
          vm.userId = $route.current.params.userid;
          vm.firstName = $route.current.params.fname;
          vm.lastName = $route.current.params.lname;
          resetLeaveForm();
          readLeaveEntries();
        }

        function addLeaveEntry() {
          startSpin();
          LeaveResource.applyLeave(vm.leaveForm).then(function(response) {
            
            vm.successMessage="Leave applied successfully !!";
            resetLeaveForm();
            readLeaveEntries();
           }, function (response) {
             vm.errorMessage=JSON.stringify(response);
           }).finally(function(){
            stopSpin();
           });

        }

        function readLeaveEntries() {
          startSpin();
          LeaveResource.readLeaveEntries(vm.userId).then(function(response) {
            vm.leaveEntries = response.data;
            vm.tableParams = new NgTableParams({}, { dataset: vm.leaveEntries});
           }, function (response) {
             vm.errorMessage=JSON.stringify(response);
           }).finally(function(){
            stopSpin();
           });
          // LeaveResource.readLeaveEntries(vm.userId).then(function(response) {
          //   vm.leaveEntries=[];
          //   debugger;
          //   alert(JSON.stringify(response));
          //   vm.leaveEntries.push(response.data);


          //  }, function (response) {
          //   alert(JSON.stringify(response));
          //    vm.errorMessage=JSON.stringify(response);
          //  }).finally(function(){
          //   stopSpin();
          //  alert("finally");
          //  });

        }

        function resetLeaveForm(){
          var initDate=$filter('date')(vm.today, 'yyyy-MM-dd');
          vm.leaveForm = {
                          "firstName": vm.firstName,
                          "lastName": vm.lastName,
                          "userId": vm.userId,
                          "status": "APPLIED",
                          "startDate":  initDate,
                          "endDate": initDate,
                          "createdDate": initDate,
                          "comment" : ""
                      };
        }

        function setStartDate() {
           if(angular.isDate(vm.selectedStartDate)){
               vm.leaveForm.startDate = $filter('date')(vm.selectedStartDate, 'yyyy-MM-dd');
           } 
        }

        function setEndDate() {
           if(angular.isDate(vm.selectedEndDate)){
               vm.leaveForm.endDate = $filter('date')(vm.selectedEndDate, 'yyyy-MM-dd');
           } 
        }
              
        function startSpin() {
            usSpinnerService.spin('spinner-leave');
        };

        function stopSpin() {
            usSpinnerService.stop('spinner-leave');
        };
        function resetMessage() {
            vm.errorMessage="";
            vm.successMessage = "";
        }


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
        

         function open1() {

            vm.openedS = !vm.openedS;
         };

         function open2() {

            vm.openedE = !vm.openedE;
         };
         // date picker methods
   }
})();

