'use strict';

var pennyAppServices = angular.module('pennyApp');

pennyAppServices
.factory('DropboxThoughts', ['dropstoreClient', function (dropstoreClient) {
  var _datastore;

  var convert = function(record) {
    return {
      id: record.get('id'),
      title: record.get('title'),
      situation: record.get('situation'),
      created: record.get('created'),
      update: record.get('updated')
    };
  };

  return {
    create: function() {

      return dropstoreClient.create({key: '6b0gayemcg13s4c'})
      .authenticate({interactive: true})
      .then(function(datastoreManager){
        console.log('completed authentication');
        return datastoreManager.openDefaultDatastore();
      })
      .then(function(datastore){
        _datastore = datastore;
        return datastore;
      });
    },
    clear: function() {
      var table = _datastore.getTable('thoughts');
      var records = table.query();

      for (var i = records.length - 1; i >= 0; i--) {
        records[i].deleteRecord();
      };
    },
    query: function() {
      var table = _datastore.getTable('thoughts');
      var records = table.query();

      var thoughts = [];

      for (var i = 0; i < records.length; i++) {
        thoughts.push(convert(records[i]));
      }

      return thoughts;
    },
    get: function(id) {
      var table = _datastore.getTable('thoughts');

      var thoughts = table.query();

      for (var i = 0; i < thoughts.length; i++) {
        if (thoughts[i].get('id') === parseInt(id)) {
          return convert(thoughts[i]);
        }
      }
    },
    store: function(thought) {
      var table = _datastore.getTable('thoughts');
 
      var thoughts = table.query();

      thought.updated = new Date();

      // Are we editing or adding?
      var exist = false;
      for (var i = 0; i < thoughts.length; i++) {
        if (thoughts[i].get('id') === thought.id) {
          thoughts[i].set('title', thought.title);
          thoughts[i].set('situation', thought.situation);
          thoughts[i].set('updated', new Date());
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
        thought.created = new Date();
        table.insert(thought);
      }
    },
    remove: function(id) {
      var table = _datastore.getTable('thoughts');
 
      var thoughts = table.query();

      for (var i = 0; i < thoughts.length; i++) {
        if (thoughts[i].get('id') === parseInt(id)) {
          thoughts[i].deleteRecord();
        }
      }
    }
  };
}]);

pennyAppServices
.factory('Thoughts', ['localStorageService', function (localStorageService) {

  return {
    query: function() {
      var thoughts = localStorageService.get('thoughts');
      return thoughts || [];
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

      thought.updated = new Date();

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

        thought.created = new Date();

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