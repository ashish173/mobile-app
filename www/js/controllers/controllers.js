(function(){
  angular.module('starter')

  .controller('ListController', ['$scope', '$http', '$q', '$state',
    function ($scope, $http, $q, $state) {
      // pull data to populate data
      var remoteDataLink = 'http://beta.json-generator.com/api/json/get/FDUuC2J';
      console.log('in list controller');

      $scope.whichArtist = $state.params.aId;
      pullData();  // it returns a promise
      console.log('which artist', $scope.whichArtist);
      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };

      $scope.onItemDelete = function(item){
        $scope.artists.splice($scope.artists.indexOf(item), 1);
      };

      $scope.toggleStar = function(item){
        item.star = !item.star;
      }

      $scope.doRefresh = function(){
        var response = pullData();
        response.then(function(){
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      function pullData(){
        var deferred = $q.defer();
        $http.get(remoteDataLink)
          .success(function(data){
            console.log('data fromk server', data);
            $scope.reservations = data;
            deferred.resolve('data recieved');
          })
          .error(function(){
            deferred.reject('No response');
          });
        return deferred.promise;
      }
  }])

})();
