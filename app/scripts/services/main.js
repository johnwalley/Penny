'use strict';

var pennyAppServices = angular.module('pennyApp');

pennyAppServices
.factory('Thoughts', ['localStorageService', function (localStorageService) {

  return {
    query: function() {
      var foo = [ 1, 2 ];
      localStorageService.add('foo', foo);
      return localStorageService.get('thoughts');
    },
    get: function(id) {
      var thoughts = localStorageService.get('thoughts');

      for (var i = 0; i < thoughts.length; i++) {
        if (thoughts[i].id === parseInt(id)) {
          return thoughts[i];
        }
      }
    },
    store: function(thought) {
      var thoughts = this.query();

      // Are we editing or adding?
      var exist = false;
      for (var i = 0; i < thoughts.length; i++) {
        if (thoughts[i].id === thought.id) {
          thoughts[i] = thought;
          exist = true;
          break;
        }
      }

      if (!exist) {
        var highest = 0;

        for (var j = 0; j < thoughts.length; j++) {
          if (thoughts[j].id > highest) {
            highest = thoughts[j].id;
          }
        }

        thought.id = highest + 1;

        thought.updated = new Date();

        thoughts.push(thought);
      }

      localStorageService.add('thoughts', angular.toJson(thoughts));
    },
    remove: function(id) {
      var thoughts = this.query();

      var newThoughts = [];

      for (var i = 0; i < thoughts.length; i++) {
        if (thoughts[i].id !== id) {
          newThoughts.push(thoughts[i]);
        }
      }

      localStorageService.add('thoughts', angular.toJson(newThoughts));
    }
  };

}]);