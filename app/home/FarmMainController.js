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
		
    	function startSpin() {
	        usSpinnerService.spin('spinner-1');
	    };

	     function stopSpin() {
	        usSpinnerService.stop('spinner-1');
	    };

    }

      
   
})();


