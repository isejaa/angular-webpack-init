import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './app.router.js';

angular.module('todo', [uiRouter])
.config(routing);
