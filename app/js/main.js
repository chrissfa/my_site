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
        saveData.loadFonts();
        $scope.$watch(function () { // watch for navigation type change and update scope

            return saveData.fontsLoaded; 

        }, function (newValue, oldValue) {
            console.log('new font value = '+newValue);

        });  

        // where are we
        
        $scope.currentLocation = '/'; // default location of scroll.          


        $scope.menu = {
          store: [
            {'item' : 'Work', 'go' : 'middle'},
            {'item' : 'Skills', 'go' : 'skills'},
            {'item' : 'Contact', 'go' : 'contact'}
          ]
          
        };

        $scope.theLinks = {
          store: [
            {'link' : 'https://uk.linkedin.com/in/chris-ward-bb809626', 'icon' : 'fa-linkedin-square'},
            {'link' : 'https://uk.linkedin.com/in/chris-ward-bb809626', 'icon' : 'fa-git-square'},
            {'link' : 'https://uk.linkedin.com/in/chris-ward-bb809626', 'icon' : 'fa-instagram'},
            {'link' : 'https://uk.linkedin.com/in/chris-ward-bb809626', 'icon' : 'fa-envelope-square'}
          ]
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



        $scope.goNew = function(path, event, element, typeOfNav){

          if(typeOfNav === 'scroll'){
            console.log('path = '+path[0]);
            $scope.currentLocation = saveData.newLocation(path); // directive watching scope.currentLocation to scroll if typeOfNav == scroll
          }
          navigation.goNew(path, event, element, typeOfNav);
          
 
        };

        $scope.afterShow = function() {
          navigation.afterShow();
        };

        $scope.href = function(link, type){
            navigation.href(link, type);
        };

  }]);









}());

