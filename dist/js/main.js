!function(){"use strict";angular.module("CWapp",["ngRoute","ngAnimate","ngSanitize","ngTouch","hmTouchEvents"]).config(["$locationProvider","$routeProvider","$sceDelegateProvider",function(t,o,e){o.when("/",{templateUrl:"/partials/home.html",controller:"MainCtrl"}).otherwise({templateUrl:"/partials/404.html",controller:"ErrorCtrl"}),t.html5Mode(!0)}]).controller("MainCtrl",["$scope","$location","getData","saveData","$sce","$timeout","$window","$rootScope","navigation",function(t,o,e,n,i,c,r,a,l){console.log("in MAIN CTRL"),t.currentLocation="/",t.menu={store:[{item:"Work",go:"middle"},{item:"Skills",go:"skills"},{item:"Contact",go:"contact"}]},t.newLocation=function(o){console.log("new location = "+o),t.currentLocation=n.newLocation(o)},t.inputType="",t.mouseDetect=function(t){l.mouseDetect()},t.touchDetect=function(t){l.touchDetect(t)},t.$watch(function(){return l.inputType},function(o,e){t.inputType=o}),t.goNew=function(t,o,e){l.goNew(t,o,e)},t.afterShow=function(){l.afterShow()}}])}();