(function () {

'use strict';

  angular.module('CWapp')


  .directive('container', ['$window', '$timeout', 'saveData', function ($window, $timeout, saveData)  { // Directive to make top buttons scroll to destination on page.
      return {
          restrict: 'C',
          link: function (scope, element, attrs) {
              





              function scrolled() {

                if(scope.currentLocation !== '/')
                {
                  console.log('other loc');
                  return;
                }
                else {
                  console.log('scroll save = '+$window.pageYOffset);
                  saveData.scrollHome = $window.pageYOffset; // window so works in IE and webkit
                }

                if(!scope.loadLater){ // if social not loaded yet
                  if($(document).scrollTop() > (scope.savePageHeight/2)){
                    console.log('load social = '+scope.savePageHeight);
                    scope.loadLater = true;
                  }


                }

              }   





    
              $timeout(function(){
                window.addEventListener('scroll', scrolled);
              },0);   

              element.on('$destroy', function() { // clean up
                    console.log('destroy!');
                    window.removeEventListener('scroll', scrolled);
              });  




           
              scope.$watch(function () {

                  return scope.currentLocation; // watch for this value change

              }, function (newValue, oldValue) {

                console.log('new v = '+newValue);

                        if(newValue === 'top-fresh'){

                            $('html,body').scrollTop(0); 
                            return;
                            // If no destination for scroll: no action / return to top.
                                               
                        } else if(newValue === '/'){

                            $('html,body').animate({
                                scrollTop: saveData.scrollHome
                            },10,'swing');                          

                        } else if(scope.currentLocation !== '') {

                            $('html,body').animate({
                                scrollTop: $("."+newValue).offset().top
                            },400,'swing');
                            scope.currentLocation = '';

                        }

              });



          }

      };

  }])


  .directive('container', ['$window', function ($window) { // Directive to make top of page fill screen
      return {
          restrict: 'C',
          link: function (scope, element, attrs) {

              var w = angular.element($window);

              scope.$watch(function () {

                  return { 'h': w.height(), 'w': w.width(), 'iw': w.innerWidth() }; // watch for this value change

              }, function (newValue, oldValue) {


                  element.find('#top, #skills').height(newValue.h);

                  scope.bottomOfTop = newValue.h; // so we can use this else where
                  scope.saveWidth = newValue.w; // so we can use this else where
                  scope.savePageHeight = $(document).height(); // so we can use this else where

                  // to set scope.teamResponsiveNo so we know when to float left or center blocks for join the team members
                  if(newValue.iw < 483){ // - 17 for scrollbars - which will always be there when team is visible

                    scope.teamResponsiveNo = 2;
                    scope.relatedResponsiveNo = 2;
                    scope.responsiveImage = 2;
                  }
                  else if(newValue.iw < 1007){ // - 17 for scrollbars - which will always be there when team is visible

                    scope.teamResponsiveNo = 3;
                    scope.relatedResponsiveNo = 4;
                    if(scope.responsiveImage != 6){
                      scope.responsiveImage = 3;
                    }
                  }
                  else {

                    scope.teamResponsiveNo = 6;
                    scope.relatedResponsiveNo = 5;
                    scope.responsiveImage = 6;
                  }  

                  scope.firstSet = true;


              }, true);

              w.bind('resize', function () { // when window/browser is resized
                  scope.$apply();
              });            

          }

      };

  }])


  .directive('toucharea', ['$animate', function ($animate) { // touch animations
    return {
      restrict: 'C',      
      scope: {
        'myShow': '=',
        'afterShow': '&'
      },
      link: function(scope, element) {

        scope.$watch('myShow', function(show, oldShow) {
          if (show) {
            console.log('GET OVER HERE');
            // Moving away from home page, grab position.
            $animate.addClass(element, 'ng-hover').then(scope.afterShow);
          }
          else {
            $animate.removeClass(element, 'ng-hover');

          }
        }, true);


      }

    };

  }]);


}());