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
          //template: '<p> hello </p>',
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

    .state('tabs.chat', {
      url: '/chats',
      views: {
        'list-detail-messages': {
          templateUrl: 'templates/chats.html',
          controller: 'ChatsController'
        }
      }
    })

    // chat detail tab
    .state('tabs.chatDetail', {
      url: '/chat_detail/:uid',
      // params: { uid: null },
      views: {
        'list-detail-messages': {
          templateUrl: 'templates/chat_detail.html',
          controller: 'ChatsController'
        }
      }
    });

  // Default route
  $urlRouterProvider.otherwise('/tab/list');
});
