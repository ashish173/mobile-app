(function(){
  angular.module('starter')
    .service('DemoService', DemoService);

    DemoService.$inject = ['$state'];
    function DemoService($state){
      console.log('In demo service');

      this.demoFunction(){
        console.log('Demo service');
      };
    }
})();
