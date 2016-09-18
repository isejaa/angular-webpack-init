import app from '../app';

describe('todo', () => {
  let ctrl, scope, store;

	beforeEach(() => {
		angular.mock.module(app);

		angular.mock.inject(($controller, $rootScope, localStorage) => {
			scope = $rootScope.$new();

			store = localStorage;

			localStorage.todos = [];
			localStorage._getFromLocalStorage = function () {
				return [];
			};
			localStorage._saveToLocalStorage = function (todos) {
				localStorage.todos = todos;
			};

			ctrl = $controller('TodoController as vm', {
				$scope: scope,
				store: store
			});
		});
	});

	it('should not have an edited Todo on start', function () {
		expect(ctrl.editedTodo).toBeNull();
	});

	it('should not have any Todos on start', function () {
		expect(ctrl.todos.length).toBe(0);
	});

	it('should have all Todos completed', function () {
		scope.$digest();
		expect(ctrl.allChecked).toBeTruthy();
	});

	describe('the filter', function () {
		it('should default to ""', function () {
			scope.$emit('$stateChangeSuccess');
			expect(ctrl.status).toBe('');
			expect(ctrl.statusFilter).toEqual({});
		});

		describe('being at /active', function () {
			it('should filter non-completed', inject(function ($controller) {
				ctrl = $controller('TodoController as vm', {
					$scope: scope,
					store: store,
					$stateParams: {
						status: 'active'
					}
				});

				scope.$emit('$stateChangeSuccess');
				expect(ctrl.statusFilter.completed).toBeFalsy();
			}));
		});

		describe('being at /completed', function () {
			it('should filter completed', inject(function ($controller) {
				ctrl = $controller('TodoController as vm', {
					$scope: scope,
					$stateParams: {
						status: 'completed'
					},
					store: store
				});

				scope.$emit('$stateChangeSuccess');
				expect(ctrl.statusFilter.completed).toBeTruthy();
			}));
		});

	});

	describe('having no Todos', function () {
		beforeEach(inject(function ($controller) {
			ctrl = $controller('TodoController as vm', {
				$scope: scope,
				store: store
			});
			scope.$digest();
		}));

		it('should not add empty Todos', function () {
			ctrl.newTodo = '';
			ctrl.addTodo();
			scope.$digest();
			expect(ctrl.todos.length).toBe(0);
		});


		it('should not add items consisting only of whitespaces', function () {
			ctrl.newTodo = '   ';
			ctrl.addTodo();
			scope.$digest();
			expect(ctrl.todos.length).toBe(0);
		});


		it('should trim whitespace from new Todos', function () {
			ctrl.newTodo = '  buy some unicorns  ';
			ctrl.addTodo();
			scope.$digest();
			expect(ctrl.todos.length).toBe(1);
			expect(ctrl.todos[0].title).toBe('buy some unicorns');
		});

	});

	describe('having some saved Todos', function () {
		let ctrl;

		beforeEach(inject(function ($controller) {
			ctrl = $controller('TodoController as vm', {
				$scope: scope,
				store: store
			});

			store.insert({ title: 'Uncompleted Item 0', completed: false });
			store.insert({ title: 'Uncompleted Item 1', completed: false });
			store.insert({ title: 'Uncompleted Item 2', completed: false });
			store.insert({ title: 'Completed Item 0', completed: true });
			store.insert({ title: 'Completed Item 1', completed: true });
			scope.$digest();
		}));

		it('should count Todos correctly', function () {
			expect(ctrl.todos.length).toBe(5);
			expect(ctrl.remainingCount).toBe(3);
			expect(ctrl.completedCount).toBe(2);
			expect(ctrl.allChecked).toBeFalsy();
		});

		it('should save Todos to local storage', function () {
			expect(ctrl.todos.length).toBe(5);
		});

		it('should remove Todos w/o title on saving', function () {
			var todo = store.todos[2];
			ctrl.editTodo(todo);
			todo.title = '';
			ctrl.saveEdits(todo);
			expect(ctrl.todos.length).toBe(4);
		});

		it('should trim Todos on saving', function () {
			var todo = store.todos[0];
			ctrl.editTodo(todo);
			todo.title = ' buy moar unicorns  ';
			ctrl.saveEdits(todo);
			expect(ctrl.todos[0].title).toBe('buy moar unicorns');
		});

		it('clearCompletedTodos() should clear completed Todos', function () {
			ctrl.clearCompletedTodos();
			expect(ctrl.todos.length).toBe(3);
		});

		it('markAll() should mark all Todos completed', function () {
			ctrl.markAll(true);
			scope.$digest();
			expect(ctrl.completedCount).toBe(5);
		});

		it('revertTodo() get a Todo to its previous state', function () {
			var todo = store.todos[0];
			ctrl.editTodo(todo);
			todo.title = 'Unicorn sparkly skypuffles.';
			ctrl.revertEdits(todo);
			scope.$digest();
			expect(ctrl.todos[0].title).toBe('Uncompleted Item 0');
		});
	});
});
