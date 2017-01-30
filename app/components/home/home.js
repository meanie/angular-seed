
/**
 * Module definition and dependencies
 */
angular.module('App.Home', [
  'App.Home.Controller',
])

/**
 * Config
 */
.config($stateProvider => {
  $stateProvider.state('home', {
    parent: 'app',
    url: '/',
    component: 'homeRoute',
  });
})

/**
 * Route component
 */
.component('homeRoute', {
  controller: 'HomeCtrl',
  templateUrl: 'home/home.html',
});
