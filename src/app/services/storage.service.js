
export default function todoStorage($http, $injector) {
  // Detect if an API backend is present. If so, return the API module, else
  // hand off the localStorage adapter
  return $http.get('/api')
    .then(() => {
      return $injector.get('api');
    })
    .catch(() => {
      return $injector.get('localStorage');
    });
}
