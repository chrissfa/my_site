(function () {

'use strict';


  angular.module('CWapp', [ 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngTouch', 'hmTouchEvents'])







  .config([
    '$locationProvider',
    '$routeProvider',
    '$sceDelegateProvider',
  


    function($locationProvider, $routeProvider, $sceDelegateProvider) {



      // routes
      $routeProvider
        .when("/", {
          templateUrl: "/partials/home.html",
          controller: "MainCtrl"          
        })

        .otherwise({
          //redirectTo: "/",
          templateUrl: "/partials/404.html",
          controller: "ErrorCtrl",
                    
        });

        $locationProvider.html5Mode(true);        



    }

  ])









  .controller('MainCtrl', ['$scope', '$location', 'getData', 'saveData', '$sce', '$timeout', '$window', '$rootScope', 'navigation', // Main ctrl to be available to all
    function ($scope, $location, getData, saveData, $sce, $timeout, $window, $rootScope, navigation) {

        console.log('in MAIN CTRL');

        // where are we
        
        $scope.currentLocation = '/'; // default location of scroll.          


        $scope.menu = {
          store: [
            {'item' : 'Work', 'go' : 'middle'},
            {'item' : 'Skills', 'go' : 'skills'},
            {'item' : 'Contact', 'go' : 'contact'}
          ]
          
        };

        $scope.newLocation = function(which) { // For top button to scroll down
          console.log('new location = '+which);
          $scope.currentLocation = saveData.newLocation(which);

        };
        

        // Touch functionality

        $scope.inputType = '';
        $scope.mouseDetect= function(event){
          //console.log('MOUSE SCOPE FUNCTION');
          navigation.mouseDetect();

        };

        $scope.touchDetect = function(event) {

          navigation.touchDetect(event);

        };

        $scope.$watch(function () { // watch for navigation type change and update scope

            return navigation.inputType; 

        }, function (newValue, oldValue) {
           
            //console.log('new inpute type detected = '+newValue);
            $scope.inputType = newValue;

        });   

        // end of touch functionality  



        $scope.goNew = function(path, event, element){
            navigation.goNew(path, event, element);
 
        };

        $scope.afterShow = function() {
          navigation.afterShow();
        };



  }]);









}());

