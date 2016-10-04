import angular from 'angular';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';

import routing from './app.router.js';

import TodoController from './todo/todo.controller.js';

import apiFactory from './services/api.service.js';
import todoStorage from './services/storage.service.js';
import localStorage from './services/localStorage.service.js';

import escapeDirective from './components/escape.directive.js';
import focusDirective from './components/focus.directive.js';

const MODULE_NAME = 'todo';

angular.module(MODULE_NAME, [ngRoute, ngResource])
.controller('TodoController', TodoController)
.factory('api', apiFactory)
.factory('todoStorage', todoStorage)
.factory('localStorage', localStorage)
.directive('todo-escape', escapeDirective)
.directive('todo-focus', focusDirective)
.config(routing);


export default MODULE_NAME;
