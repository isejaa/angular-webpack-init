
export default function($timeout) {
  'ngInject';

  return function ($scope, element, attrs) {
    $scope.$watch(attrs.todoFocus, function (newVal) {
      if (newVal) {
        $timeout(function () {
          element[0].focus();
        }, 0, false);
      }
    });
  };
}
