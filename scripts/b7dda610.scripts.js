"use strict";angular.module("pennyApp",["ngResource","ngRoute","ui","ui.bootstrap","LocalStorageModule"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/thought-list.html",controller:"ThoughtListCtrl"}).when("/thoughts",{templateUrl:"views/thought-list.html",controller:"ThoughtListCtrl"}).when("/thoughts/add",{templateUrl:"views/thought-edit.html",controller:"ThoughtEditCtrl"}).when("/thoughts/:thoughtId",{templateUrl:"views/thought-detail.html",controller:"ThoughtDetailCtrl"}).when("/thoughts/edit/:thoughtId",{templateUrl:"views/thought-edit.html",controller:"ThoughtEditCtrl"}).otherwise({redirectTo:"/"})}]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]);var pennyAppServices=angular.module("pennyApp");pennyAppServices.factory("Thoughts",["localStorageService",function(a){return{query:function(){var b=a.get("thoughts");return b||[]},get:function(b){for(var c=a.get("thoughts"),d=0;d<c.length;d++)if(c[d].id===parseInt(b))return c[d]},store:function(b){var c=this.query();b.updated=new Date;for(var d=!1,e=0;e<c.length;e++)if(c[e].id===b.id){c[e]=b,d=!0;break}if(!d){for(var f=0,g=0;g<c.length;g++)c[g].id>f&&(f=c[g].id);b.id=f+1,b.created=new Date,c.push(b)}a.add("thoughts",angular.toJson(c))},remove:function(b){for(var c=this.query(),d=[],e=0;e<c.length;e++)c[e].id!==b&&d.push(c[e]);a.add("thoughts",angular.toJson(d))}}}]);var pennyAppControllers=angular.module("pennyApp");pennyAppControllers.controller("ThoughtEditCtrl",["$scope","$routeParams","$location","Thoughts",function(a,b,c,d){var e=5;a.debug=!1,a.mood={description:"",rating:e},b.thoughtId?a.thought=d.get(b.thoughtId):(a.thought={},a.thought.moods=[]),a.save=function(){d.store(a.thought),c.path("thoughts")},a.cancel=function(){d.store(a.thought),c.path("thoughts")},a.addMood=function(){a.mood.ratingNow=a.mood.rating,a.thought.moods.push(a.mood),a.mood={description:"",rating:e}},a.removeMood=function(b){a.thought.moods.splice(b,1)}}]),pennyAppControllers.controller("ThoughtListCtrl",["$scope","$location","Thoughts","$modal",function(a,b,c,d){a.orderProp="-updated",a.thoughts=c.query(),a.confirm=function(b){var f=d.open({templateUrl:"myModalContent.html",controller:e,resolve:{thought:function(){return c.get(b)}}});f.result.then(function(){a.remove(b)},function(){})};var e=function(a,b,c){a.thought=c,a.ok=function(){b.close()},a.cancel=function(){b.dismiss()}};a.show=function(a){b.path("thoughts/"+a)},a.edit=function(a){b.path("thoughts/edit/"+a)},a.remove=function(b){c.remove(b),a.thoughts=c.query()}}]),pennyAppControllers.controller("ThoughtDetailCtrl",["$scope","$location","$routeParams","Thoughts",function(a,b,c,d){a.thought=d.get(c.thoughtId),a.edit=function(a){b.path("thoughts/edit/"+a)}}]);