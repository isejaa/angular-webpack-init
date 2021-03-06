require('./todo.scss');

export default function TodoController($scope, $filter, store, $routeParams) {
	'ngInject';
  const vm = this;
  const todos = vm.todos = store.todos;

  vm.newTodo = '';
  vm.editedTodo = null;

	$scope.$watch('vm.todos', () => {
		vm.remainingCount = $filter('filter')(todos, { completed: false }).length;
		vm.completedCount = todos.length - vm.remainingCount;
		vm.allChecked = !vm.remainingCount;
	}, true);

	// Monitor the current route for changes and adjust the filter accordingly.
	$scope.$on('$routeChangeSuccess', (e) => {
		var status = vm.status = $routeParams.status || '';
		vm.statusFilter = (status === 'active') ?
			{ completed: false } : (status === 'completed') ?
			{ completed: true } : {};
	});

  vm.addTodo = () => {
  	var newTodo = {
  		title: vm.newTodo.trim(),
  		completed: false
  	};

		if (!newTodo.title) {
			return;
		}

		vm.saving = true;
		store.insert(newTodo)
			.then(function success() {
				vm.newTodo = '';
			})
			.finally(function () {
				vm.saving = false;
			});
  };

	vm.editTodo = (todo) => {
		vm.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		vm.originalTodo = angular.extend({}, todo);
	};

	vm.saveEdits = (todo, event) => {
		// Blur events are automatically triggered after the form submit event.
		// This does some unfortunate logic handling to prevent saving twice.
		if (event === 'blur' && vm.saveEvent === 'submit') {
			vm.saveEvent = null;
			return;
		}

		vm.saveEvent = event;

		if (vm.reverted) {
			// Todo edits were reverted-- don't save.
			vm.reverted = null;
			return;
		}

		todo.title = todo.title.trim();

		if (todo.title === vm.originalTodo.title) {
			vm.editedTodo = null;
			return;
		}

		store[todo.title ? 'put' : 'delete'](todo)
			.then(function success() {}, function error() {
				todo.title = $scope.originalTodo.title;
			})
			.finally(function () {
				vm.editedTodo = null;
			});
	};

	vm.revertEdits = (todo) => {
		todos[todos.indexOf(todo)] = vm.originalTodo;
		vm.editedTodo = null;
		vm.originalTodo = null;
		vm.reverted = true;
	};

	vm.removeTodo = (todo) => {
		store.delete(todo);
	};

	vm.saveTodo = (todo) => {
		store.put(todo);
	};

	vm.toggleCompleted = (todo, completed) => {
		if (angular.isDefined(completed)) {
			todo.completed = completed;
		}
		store.put(todo, todos.indexOf(todo))
			.then(function success() {}, function error() {
				todo.completed = !todo.completed;
			});
	};

	vm.clearCompletedTodos = () => {
		store.clearCompleted();
	};

	vm.markAll = (completed) => {
		todos.forEach((todo) => {
			if (todo.completed !== completed) {
				vm.toggleCompleted(todo, completed);
			}
		});
	};
}
