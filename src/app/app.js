import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './app.router.js';

import TodoController from './todo/todo.controller.js';

import apiFactory from './services/api.service.js';
import todoStorage from './services/storage.service.js';
import localStorage from './services/localStorage.service.js';

angular.module('todo', [uiRouter])
.controller('TodoController', TodoController)
.factory('api', apiFactory)
.factory('todoStorage', todoStorage)
.factory('localStorage', localStorage)
.config(routing);
