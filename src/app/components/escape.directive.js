
export default function () {
  const ESCAPE_KEY = 27;

	return function ($scope, element, attrs) {
		element.bind('keydown', function (event) {
			if (event.keyCode === ESCAPE_KEY) {
				$scope.$apply(attrs.todoEscape);
			}
		});

		element.$on('$destroy', function () {
			element.unbind('keydown');
		});
	};
}
