

app.controller('mainController',['$scope', '$http', function($scope, $http){
	$scope.formData = {};


	//show all todos

	$http.get('/api/todos').success(function(data){

		$scope.todos = data;
		console.log(data);
	}).error(function(data){
		console.log('Some Error:' + data);

	});

	//send the text from form to node API

	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData).success(function(data){

			$scope.formData = {}; //clear the form
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){

			console.log('Some Error:' + data);
		});

	};

	//delete a todo

	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id).success(function(data){
			$scope.todos = data;
			console.log(data);

		})
		.error(function(data){
 			console.log('Error:' + data);

		});

	};




}]);
