'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function() {
        localStorageService.set('todos', $scope.todos);
    }, true);

    // addTodo
    $scope.addTodo = function() {
    	$scope.todos.unshift($scope.todo);
    	$scope.todo = '';
    };

    // removeTodo
    $scope.removeTodo = function(index) {
    	$scope.todos.splice(index, 1);
    };

  });
