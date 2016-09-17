import uiRouter from 'angular-ui-router';

import router from './app.router.js';

angular.module('todo', [uiRouter])
.config(router);
