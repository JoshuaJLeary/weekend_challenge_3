console.log('js');

let toDoList = angular.module('toDoList', []);

toDoList.controller('ToDoListController', ['$http', function($http) {
    console.log('controller has started');
    let task = this;

    task.taskArray = [];

    task.click = function(chore) {
        console.log('button clicked!');
        chore.completed = !chore.completed;
    };

    task.deleteTask = function(taskId) {
        console.log('button clicked');
        $http({
            method: 'DELETE',
            url: '/todo/' + taskId,
        }).then(function(response) {
            console.log('Delete completed', response);
            task.getTask();
        }).catch(function(error) {
            console.log('Error TODO: ALert the User');
        });
    }

    task.addTask = function(newTask) {
        console.log('inside addTask', newTask);
          $http({
              method: 'POST',
              url: '/todo',
              data: newTask
          }).then(function(response) {
              console.log('POST response:', response);
              task.getTask();
          }).catch(function(error) {
              console.log('Error in POST', error);
          });
    }

    task.getTask = function() {
        $http({
            method: 'GET',
            url: '/todo'
        }).then(function(response) {
            console.log('GET response', response);
            task.taskArray = response.data;
        }).catch(function(error) {
            console.log('Error in GET', error);
        });
    }
    task.getTask();

}]);

