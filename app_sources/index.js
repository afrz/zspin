'use strict';

var app = angular.module('app', [
  'ngLoad',
  'ngRoute',
  'ngResize',
  'cfp.hotkeys',
  'jsonFormatter',
  'templates',
]);

app.config(['resizeProvider', function(resizeProvider){
  resizeProvider.throttle = 10;
  resizeProvider.initBind = true;
}]);

app.config(['$sceDelegateProvider', function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^.*$')]);
}]);

app.run(['settings', 'inputs', function(settings, inputs) {
  // Force the settings service to be instanciated early
}]);


app.run(['$rootScope', 'zspin', function($rootScope, zspin) {
  // Create global home shortcut
  $rootScope.$on('input:home', function () {
    zspin.gui.Window.get().focus(); //use when quitting game
  });
}])