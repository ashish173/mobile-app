(function(){
  angular.module('starter')
  .controller('ChatsController', ChatsController);

  ChatsController.$inject = ['$scope', '$state', '$q', '$http', '$stateParams'];
  function ChatsController($scope, $state, $q, $http, $stateParams){
    var remoteDataLink = 'http://beta.json-generator.com/api/json/get/FDUuC2J';
    var uId = $stateParams.uid;
    // if uId is present then do all the setup for quick blox
    // actually later do it on hitting chats list page

    
    pullData();
    pullJsonData();

    function pullData(){
      var deferred = $q.defer();
      $http.get('js/data.json')
        .success(function(data){
          $scope.artists = data.artists;
          deferred.resolve('data recieved');
        })
        .error(function(){
          deferred.reject('No response');
        });
      return deferred.promise;
    }

    function pullJsonData(){
      $http.get(remoteDataLink)
        .success(function(data){
          console.log('Data from remote server ', data);
        });
    }
    console.log('In chats cotroller');
  };
})();
