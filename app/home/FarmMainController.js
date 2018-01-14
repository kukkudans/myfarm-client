 (function () {
        
    'use strict';

    angular
        .module('farmApp')
        .controller('FarmMainController', FarmMainController);
    
    FarmMainController.$inject = ['usSpinnerService'];
     
    function FarmMainController(usSpinnerService) {
        var vm = this;
        vm.panelTitle="MyFarm : Sign In  ";

		vm.startSpin =startSpin;
		vm.stopSpin =stopSpin;
        vm.status =status;
        vm.toggled =toggled;
        vm.toggleDropdown = toggleDropdown;
		
    	function startSpin() {
	        usSpinnerService.spin('spinner-1');
	    };

	     function stopSpin() {
	        usSpinnerService.stop('spinner-1');
	    };

        function status() {
            isopen: false
        };

        function toggled(open) {
            $log.log('Dropdown is now: ', open);
        };

        function toggleDropdown($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

          // $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

    }

      
   
})();


