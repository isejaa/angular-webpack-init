const template = require('./todo/todo.html');

export default function router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/:status',
    template: template,
    controller: 'TodoController',
    controllerAs: 'vm',
    resolve: {
      store: function(todoStorage) {
        return todoStorage;
      }
    }
  });

}
