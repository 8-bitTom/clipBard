'use strict';

angular.module('clipBardApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
