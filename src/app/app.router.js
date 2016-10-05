const todoTmpl = require('./todo/todo.html');

export default function router($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  var routeConfig = {
    controller: 'TodoController',
    controllerAs: 'vm',
    template: todoTmpl,
    resolve: {
      store: (todoStorage) => {
        // Get the correct module (API or localStorage).
        return todoStorage.then(function (module) {
          module.get(); // Fetch the todo records in the background.
          return module;
        });
      }
    }
  };

  $routeProvider
    .when('/', routeConfig)
    .when('/:status', routeConfig)
    .otherwise({
      redirectTo: '/'
    });



}
