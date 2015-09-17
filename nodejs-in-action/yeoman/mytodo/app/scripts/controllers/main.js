'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope) {

    $scope.todos = [];

    // addTodo
    $scope.addTodo = function() {
    	$scope.todos.push($scope.todo);
    	$scope.todo = '';
    };

    // removeTodo
    $scope.removeTodo = function(index) {
    	$scope.todos.splice(index, 1);
    };
  });
