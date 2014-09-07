'use strict';

var pennyAppServices = angular.module('pennyApp');

pennyAppServices
.factory('DropboxThoughts', ['$q', 'dropstoreClient', function ($q, dropstoreClient) {
  var _datastore;

  var user;

  dropstoreClient.create({key: '6b0gayemcg13s4c'});

  var getThoughts = function() {
    var table = _datastore.getTable('thoughts');
    var records = table.query();

    var thoughts = [];

    for (var i = 0; i < records.length; i++) {
      thoughts.push(convert(records[i]));
    }

    return thoughts;
  }

  var getUser = function(accountInfo) {
      user = { name: accountInfo.name, email: accountInfo.email };

      return user;
  }

  var convert = function(record) {
    return {
      id: record.get('id'),
      title: record.get('title'),
      situation: record.get('situation'),
      moods: angular.fromJson(record.get('moods')),
      automaticThoughts: record.get('automaticThoughts'),
      hotThought: record.get('hotThought'),
      evidenceFor: record.get('evidenceFor'),
      evidenceAgainst: record.get('evidenceAgainst'),
      alternativeThoughts: record.get('alternativeThoughts'),
      created: record.get('created'),
      updated: record.get('updated')
    };
  };

  var authenticate = function() {
    return dropstoreClient.create({key: '6b0gayemcg13s4c'})
      .authenticate({interactive: true})
      .then(function(datastoreManager) {
        console.log('completed authentication');
        return datastoreManager.openDefaultDatastore();
      })
      .then(function(datastore){
        _datastore = datastore;

        return datastore;
      });
  };

  return {
    create: function() {
      return authenticate();
    },
    clear: function() {
      var table = _datastore.getTable('thoughts');
      var records = table.query();

      for (var i = records.length - 1; i >= 0; i--) {
        records[i].deleteRecord();
      }
    },
    query: function() {
      if (!dropstoreClient.isAuthenticated()) {
        return authenticate().then(function() {
          return getThoughts();
        });
      }

      var deferred = $q.defer();
      deferred.resolve(getThoughts());
      return deferred.promise;
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
          thoughts[i].set('moods', angularthought.moods);
          thoughts[i].set('automaticThoughts', thought.automaticThoughts);
          thoughts[i].set('hotThought', thought.hotThought);
          thoughts[i].set('evidenceFor', thought.evidenceFor);
          thoughts[i].set('evidenceAgainst', thought.evidenceAgainst);
          thoughts[i].set('alternativeThoughts', thought.alternativeThoughts);
          thoughts[i].set('updated', new Date());
          exist = true;
          break;
        }
      }

      if (!exist) {
        var highest = 0;

        for (var j = 0; j < thoughts.length; j++) {
          if (thoughts[j].get('id') > highest) {
            highest = thoughts[j].get('id');
          }
        }

        thought.id = highest + 1;
        thought.created = new Date();

        var thoughtCopy = thought;

        thoughtCopy.moods = angular.toJson(thought.moods);

        table.insert(thoughtCopy);
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
    },
    getUserInfo: function() {
      if (!dropstoreClient.isAuthenticated()) {
        console.log('not authenticated');
        return authenticate().then(function() {
          return dropstoreClient.getAccountInfo({httpCache: true});
        })
        .then(function(accountInfo) {
          return getUser(accountInfo);
        });
      }

      return dropstoreClient.getAccountInfo({httpCache: true}).then(function(accountInfo) {
          return getUser(accountInfo);
        });
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