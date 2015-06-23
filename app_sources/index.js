'use strict';

var app = angular.module('app', [
  'ngLoad',
  'ngRoute',
  'ngResize',
  'cfp.hotkeys',
  'jsonFormatter',
  'templates',
  'toastr',
  'ngAnimate',
  'piwik',
]);

// =========== resize provider
app.config(['resizeProvider', function(resizeProvider){
  resizeProvider.throttle = 10;
  resizeProvider.initBind = true;
}]);

// =========== url whitelist
app.config(['$sceDelegateProvider', function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^.*$')]);
}]);

// =========== toastr notifications config
app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    extendedTimeOut: 1000,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    tapToDismiss: true,
    timeOut: 1000,
  });
});

// =========== Preload services
app.run(['settings', 'inputs', function(settings, inputs) {
  // Force the settings service to be instanciated early
}]);

// =========== zspin core settings
app.run(['zspin', function(zspin) {

  // initialize window menu
  var nativeMenuBar = new zspin.gui.Menu({type: "menubar"});

  // check operating system and add menu if osx
  if (process.platform === "darwin") {
    nativeMenuBar.createMacBuiltin(zspin.appName);
  }

  // actually assign menu to window
  zspin.guiWindow.menu = nativeMenuBar;
}]);

// =========== config shortcuts
app.run(['$rootScope', 'zspin', '$location', function($rootScope, zspin, $location) {

  // Create global home shortcut
  $rootScope.$on('input:home', function () {
    zspin.guiWindow.focus(); //use when quitting game
  });

  // Create settings shortcut
  $rootScope.$on('input:settings', function () {
    $location.url('/settings');
  });

  // Create fullscreen shortcut
  $rootScope.$on('input:fullscreen', function () {
    zspin.toggleFullscreen();
  });

  // Create devtools shortcut
  $rootScope.$on('input:devtools', function () {
    zspin.guiWindow.showDevTools();
  });

  // Create devmenu shortcut
  $rootScope.$on('input:devmenu', function () {
    $location.url('/debug');
  });

}]);
