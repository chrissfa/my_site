(function () {

'use strict';


  angular.module('CWapp')




  .factory('getData', ['$rootScope', '$http', '$q', 'saveData', '$timeout', function($rootScope, $http, $q, saveData, $timeout) {
      return{
          getClients: function () {

            var url = "http://www.thealloy.com/cache/blogs.json";

            return $http.get(url)
              .success(function(data){



              })
              .error(function(){});


          }
      };



    }])




    .factory('saveData', ['$http', '$window', function ($http, $window) {
        var save = {};
        save.weDo = [];
        save.scrollHome = 0;
        save.newLocation = function(which) { // For top button to scroll down
          console.log('new location = '+which);
          this.currentLocation = which;
          //saveData.currentLocation = $scope.currentLocation;
          return this.currentLocation;
        };

        return save;

    }])

    .factory('navigation', ['$timeout', '$location', '$window', function ($timeout, $location, $window) { // service that detects mouse vs touch and controls navigation
        var save = {};
        save.mouseToken = []; // for logic so that mouse and touch stay seperate - it's going to take a perlonged mouse movement (i.e. register 5 pixels) before mouse confirmation, else it stays as touch.
        save.inputType = '';

        save.mouseDetect = function(event){
          var m = this;
          this.mouseToken.push('mouse');
          console.log('in go == mouse');
          if(this.mouseToken.length > 10){
            //console.log('MOUSE DETECTED');

            this.mouseToken = []; // empty

            this.inputType = 'mouse';

          }

          $timeout(function(){
            m.mouseToken = [];
          },500);

        };

        save.touchDetect = function(event){
          if(event.pointerType == 'touch'){ // only grab if touch detected, mouse detect on mousemove will take care of = 'mouse'
            console.log('in go == '+event.pointerType);
            this.inputType = 'touch';
            //console.log('TOUCH DETECTED');            
          }
        };   


        save.navInfo = {'selectedNo': null, 'element': null };

        save.goNew = function(path, event, element){

            console.log('go new');

            this.navInfo.selectedNo = path;
            this.navInfo.element = element;

            console.log('this.navInfo.element.length = '+this.navInfo.selectedNo.length);


            if(this.inputType == 'touch'){
              console.log('TOUCH');
              this.navInfo.element.show = true;          
            }
            else{

              this.afterShow();

            }            
        }; 

        save.afterShow = function(event){
          var i = this;
          this.navInfo.element.over = false;  
          //if (this.navInfo.selectedNo instanceof Array) { // if value is array we would like to open as an href
          //  this.href(this.navInfo.selectedNo[0], this.navInfo.selectedNo[1]);
          //} else {
          //$location.url(this.navInfo.selectedNo);
          //}          

          console.log('after show = '+i.navInfo.element.over);
          $timeout(function(){ // slight delay so animation doesn't stop until page has loaded - ie no animation jump
                i.navInfo.element.over = false;
                i.navInfo.element.show = false;


          },500);
        }; 

        save.href = function(link, type){
            console.log('HREF');
            $window.open(link, type);
            this.leadForensics(link, link);
        };

        return save;

    }]);


}());