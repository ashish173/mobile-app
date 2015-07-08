// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })


  // Default route
  $urlRouterProvider.otherwise('/tab/home');
})

.controller('ListController',
  ['$scope', '$http', '$q', '$state',
  function ($scope, $http, $q, $state) {
    // pull data to populate data
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
}])
