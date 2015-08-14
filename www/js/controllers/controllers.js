(function(){
  angular.module('starter')

  .controller('ListController',
    [
      '$scope', '$http', '$q', '$state', '$ionicModal', 
      function ($scope, $http, $q, $state, $ionicModal) {
      // pull data to populate data
      //var remoteDataLink = 'http://beta.json-generator.com/api/json/get/FDUuC2J';
      var remoteDataLink = 'http://localhost:3000/api/v1/reservations';
      console.log('in list controller');

      // Comment Modal Here
      //--------------------
        $ionicModal.fromTemplateUrl('/templates/comment_modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });
        $scope.openModal = function() {
          $scope.modal.show();
        };
        $scope.closeModal = function() {
          $scope.modal.hide();
        };
      //---------------------

      $scope.data = {showDelete: false, showReorder: false};

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
            console.log('data from server', data);
            window.data = data;
            $scope.reservations = data.reservations;
            deferred.resolve('data recieved');
            showDetail();
          })
          .error(function(){
            deferred.reject('No response');
          });
        return deferred.promise;
      }

      function showDetail(){
        angular.forEach($scope.reservations, function(obj){
          if(obj['id'] == $scope.whichArtist){
            $scope.reservation = obj;
          }
        });
      };

      $scope.postComment = function(){
        postCommentUrl = "http://localhost:3000/api/v1/reservations/" + $scope.reservation.id + "/comments";
        $http.post(postCommentUrl,{message: $scope.reservation.new_comment})
          .success(function(data){
            $scope.reservation.comments.push(data['comment']);
            $scope.reservation.new_comment = '';
          })
          .error(function(err){
            console.log(err);     
          })
      }
  }])

})();
