'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pennyApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have no items to start', function () {
      expect(scope.moods.length).toBe(0);
    });

  it('should add items to the list', function () {
      scope.mood = 'Test 1';
      scope.addMood();
      expect(scope.moods.length).toBe(1);
    });

  it('should add items to the list', function () {
      scope.mood = 'Test 1';
      scope.addMood();
      scope.removeMood(0);
      expect(scope.moods.length).toBe(0);
    });
});
