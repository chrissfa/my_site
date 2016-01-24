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
        save.fontsLoaded = false;
        
        save.newLocation = function(which) { // For top button to scroll down
          console.log('new location = '+which);
          this.currentLocation = which;
          //saveData.currentLocation = $scope.currentLocation;
          return this.currentLocation;
        };
        save.loadFonts = function () {
                var that = this;
                function onActive() {
                  console.log('font loaded');
                  that.fontsLoaded = true;
                }

                function onInactive() {
                  that.fontsLoaded = false;
                }

                $window.WebFont.load({
                  custom: {
                    families: ['open_sanslight open_sansitalic, open_sanslight_italic, open_sansregular, open_sanssemibold']
                  },
                  active: onActive,
                  inactive: onInactive
                });
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

        save.goNew = function(path, event, element, typeOfNav){

            console.log('go new = '+path[1]);

            this.navInfo.selectedNo = path;
            this.navInfo.element = element;

            console.log('this.navInfo.element.length = '+this.navInfo.selectedNo.length);

            if(this.inputType == 'touch'){
              console.log('TOUCH');
              element.show = true;   

               
            }
            else{

              this.afterShow();

            }            
        }; 

        save.afterShow = function(event){
          var i = this;
          this.navInfo.element.over = false;  
          if (this.navInfo.selectedNo instanceof Array) { // if value is array we would like to open as an href
            console.log('ARRAYED');
            this.href(this.navInfo.selectedNo[0], this.navInfo.selectedNo[1]);
          } //else {
          //$location.url(this.navInfo.selectedNo);
          //}          

          console.log('after show = '+i.navInfo.element.over);

          i.navInfo.element.over = false;
          i.navInfo.element.show = false;


        }; 

        save.href = function(link, type){
            console.log('HREF');
            $window.open(link, type);

        };

        return save;

    }]);


}());