import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import routing from './app.router.js';

import TodoController from './todo/todo.controller.js';

import apiFactory from './services/api.service.js';
import todoStorage from './services/storage.service.js';
import localStorage from './services/localStorage.service.js';

const MODULE_NAME = 'todo';

angular.module(MODULE_NAME, [uiRouter, ngResource])
.controller('TodoController', TodoController)
.factory('api', apiFactory)
.factory('todoStorage', todoStorage)
.factory('localStorage', localStorage)
.config(routing);


export default MODULE_NAME;
