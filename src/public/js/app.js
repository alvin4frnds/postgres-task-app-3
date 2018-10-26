var app = angular.module('app', []);

app.controller('tasks-controller', function ($scope, $http) {
    $scope.lists = [];
    const BASE_URL = 'api/todos';

    $scope.item = {};

    $scope.done = function(item) {
        console.log("done() with: ", item);

        item.done = true;

        $http.patch(BASE_URL + "/" + item.id, item)
            .then(function(response) {
                if (response.data.success) item = response.data.todo;
                else if (response.data.message) alert(response.data.message);
            });
    };

    $scope.edit = function(item) {
        console.log("edit() with: ", item);

        item.editing = true;
        $scope.item = item;
    };

    $scope.add = function(item) {
        console.log("add() with: ", item);

        if (! item.body) return;

        $http.post(BASE_URL + "/create", item)
            .then(function(response) {
                if (response.data.success) $scope.lists.unshift(response.data.todo);
                else if (response.data.message) alert(response.data.message);
            });

        $scope.item = {};
    };

    $scope.update = function (item) {
        console.log("update() with: ", item);

        item.done = false;
        item.editing = false;

        $http.patch(BASE_URL + "/" + item.id, item)
            .then(function(response) {
                if (response.data.success) item = response.data.todo;
                else if (response.data.message) alert(response.data.message);
            });

        $scope.item = {};
    };

    (function() {
        $http.get(BASE_URL).then(function(response) {
            if (response.data.success) $scope.lists = response.data.todos;
            else if (response.data.message) alert(response.data.message);
        })
    })();
});