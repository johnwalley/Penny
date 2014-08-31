"use strict";angular.module("pennyApp",["ngResource","ngRoute","ui.bootstrap","LocalStorageModule","dropstore-ng","recordWrapper","xeditable"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/thought-list.html",controller:"ThoughtListCtrl"}).when("/thoughts",{templateUrl:"views/thought-list.html",controller:"ThoughtListCtrl"}).when("/thoughts/add",{templateUrl:"views/thought-edit.html",controller:"ThoughtEditCtrl"}).when("/thoughts/:thoughtId",{templateUrl:"views/thought-detail.html",controller:"ThoughtDetailCtrl"}).when("/thoughts/edit/:thoughtId",{templateUrl:"views/thought-edit.html",controller:"ThoughtEditCtrl"}).otherwise({redirectTo:"/"}),b.hashPrefix("!"),b.html5Mode(!0)}]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).run(function(a){a.theme="bs3"});var pennyAppServices=angular.module("pennyApp");pennyAppServices.factory("DropboxThoughts",["dropstoreClient",function(a){var b,c=function(a){return{id:a.get("id"),title:a.get("title"),situation:a.get("situation"),created:a.get("created"),update:a.get("updated")}};return{create:function(){return a.create({key:"6b0gayemcg13s4c"}).authenticate({interactive:!0}).then(function(a){return console.log("completed authentication"),a.openDefaultDatastore()}).then(function(a){return b=a,a})},clear:function(){for(var a=b.getTable("thoughts"),c=a.query(),d=c.length-1;d>=0;d--)c[d].deleteRecord()},query:function(){for(var a=b.getTable("thoughts"),d=a.query(),e=[],f=0;f<d.length;f++)e.push(c(d[f]));return e},get:function(a){for(var d=b.getTable("thoughts"),e=d.query(),f=0;f<e.length;f++)if(e[f].get("id")===parseInt(a))return c(e[f])},store:function(a){var c=b.getTable("thoughts"),d=c.query();a.updated=new Date;for(var e=!1,f=0;f<d.length;f++)if(d[f].get("id")===a.id){d[f].set("title",a.title),d[f].set("situation",a.situation),d[f].set("updated",new Date),e=!0;break}if(!e){for(var g=0,h=0;h<d.length;h++)d[h].id>g&&(g=d[h].id);a.id=g+1,a.created=new Date,c.insert(a)}},remove:function(a){for(var c=b.getTable("thoughts"),d=c.query(),e=0;e<d.length;e++)d[e].get("id")===parseInt(a)&&d[e].deleteRecord()}}}]),pennyAppServices.factory("Thoughts",["localStorageService",function(a){return{query:function(){var b=a.get("thoughts");return b||[]},get:function(b){for(var c=a.get("thoughts"),d=0;d<c.length;d++)if(c[d].id===parseInt(b))return c[d]},store:function(b){var c=this.query();b.updated=new Date;for(var d=!1,e=0;e<c.length;e++)if(c[e].id===b.id){c[e]=b,d=!0;break}if(!d){for(var f=0,g=0;g<c.length;g++)c[g].id>f&&(f=c[g].id);b.id=f+1,b.created=new Date,c.push(b)}a.add("thoughts",angular.toJson(c))},remove:function(b){for(var c=this.query(),d=[],e=0;e<c.length;e++)c[e].id!==b&&d.push(c[e]);a.add("thoughts",angular.toJson(d))}}}]);var pennyAppControllers=angular.module("pennyApp");pennyAppControllers.controller("ThoughtEditCtrl",["$scope","$routeParams","$location","DropboxThoughts","recordWrapper",function(a,b,c,d,e){var f=5;a.recordWrapper=e,a.debug=!1,a.mood={description:"",rating:f},b.thoughtId?a.thought=d.get(b.thoughtId):(a.thought={},a.thought.moods=[]),a.save=function(){d.store(a.thought),c.path("/thoughts")},a.cancel=function(){d.store(a.thought),c.path("/thoughts")},a.addMood=function(){a.mood.ratingNow=a.mood.rating,a.thought.moods.push(a.mood),a.mood={description:"",rating:f}},a.removeMood=function(b){a.thought.moods.splice(b,1)}}]),pennyAppControllers.controller("ThoughtListCtrl",["$scope","$location","Thoughts","$modal","DropboxThoughts",function(a,b,c,d,e){a.orderProp="-updated",e.create().then(function(){a.thoughts=e.query()}),a.authenticate=function(){},a.add=function(){e.clear(),a.thoughts=e.query()},a.confirm=function(b){var e=d.open({templateUrl:"myModalContent.html",controller:f,resolve:{thought:function(){return c.get(b)}}});e.result.then(function(){a.remove(b)},function(){})};var f=function(a,b,c){a.thought=c,a.ok=function(){b.close()},a.cancel=function(){b.dismiss()}};a.show=function(a){b.path("/thoughts/"+a)},a.edit=function(a){b.path("/thoughts/edit/"+a)},a.remove=function(b){c.remove(b),a.thoughts=c.query()}}]),pennyAppControllers.controller("ThoughtDetailCtrl",["$scope","$location","$routeParams","DropboxThoughts",function(a,b,c,d){a.thought=d.get(c.thoughtId),a.edit=function(a){b.path("/thoughts/edit/"+a)}}]);