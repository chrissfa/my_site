!function(){"use strict";angular.module("CWapp").directive("container",["$window","$timeout","saveData",function(e,o,t){return{restrict:"C",link:function(n,i,r){function s(){return"/"!==n.currentLocation?void console.log("other loc"):(console.log("scroll save = "+e.pageYOffset),t.scrollHome=e.pageYOffset,void(n.loadLater||$(document).scrollTop()>n.savePageHeight/2&&(console.log("load social = "+n.savePageHeight),n.loadLater=!0)))}o(function(){window.addEventListener("scroll",s)},0),i.on("$destroy",function(){console.log("destroy!"),window.removeEventListener("scroll",s)}),n.$watch(function(){return n.currentLocation},function(e,o){return console.log("new v = "+e),"top-fresh"===e?void $("html,body").scrollTop(0):void("/"===e?$("html,body").animate({scrollTop:t.scrollHome},10,"swing"):""!==n.currentLocation&&($("html,body").animate({scrollTop:$("."+e).offset().top},400,"swing"),n.currentLocation=""))})}}}]).directive("container",["$window",function(e){return{restrict:"C",link:function(o,t,n){var i=angular.element(e);o.$watch(function(){return{h:i.height(),w:i.width(),iw:i.innerWidth()}},function(e,n){t.find("#top, #skills").height(e.h),o.bottomOfTop=e.h,o.saveWidth=e.w,o.savePageHeight=$(document).height(),e.iw<483?(o.teamResponsiveNo=2,o.relatedResponsiveNo=2,o.responsiveImage=2):e.iw<1007?(o.teamResponsiveNo=3,o.relatedResponsiveNo=4,6!=o.responsiveImage&&(o.responsiveImage=3)):(o.teamResponsiveNo=6,o.relatedResponsiveNo=5,o.responsiveImage=6),o.firstSet=!0},!0),i.bind("resize",function(){o.$apply()})}}}]).directive("toucharea",["$animate",function(e){return{restrict:"C",scope:{myShow:"=",afterShow:"&"},link:function(o,t){o.$watch("myShow",function(n,i){n&&(console.log("GET OVER HERE"),e.addClass(t,"ng-hover").then(o.afterShow))},!0)}}}])}();