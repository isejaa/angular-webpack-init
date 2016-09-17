
export default function storage($http, $injector) {
  // Detect if an API backend is present. If so, return the API module, else
  // hand off the localStorage adapter
  return $http.get('/api')
    .then(function () {
      return $injector.get('api');
    }, function () {
      return $injector.get('localStorage');
    });

}
