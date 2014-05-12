'use strict';

angular.module('clipBardApp')
  .service('Clips', function Clips($q, $http, $cacheFactory, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		var out = {};

		var lru = $cacheFactory( 'lru', {
			capacity: 20
		} );

		function findById(id){
			var deferred = $q.defer();
			$http( {
				method:  'GET',
				url:     '/api/clips/id/' + id,
				timeout: 40000,
				cache:   lru
			} ).success(function ( data ) {
					deferred.resolve( data );
				} ).error( function ( reason ) {
//					console.log( reason );
					deferred.reject( reason );
				} );
			return deferred.promise;
		}

		function search(params){
			var deferred = $q.defer();
			var paramArray = [];

			angular.forEach(params, function(val, key){
				if(angular.isArray(val)){
					val = val.join(',');
				}
				this.push(key + '=' + val)
			}, paramArray);

			$http( {
				method:  'GET',
				url:     '/api/clips/search?' + paramArray.join('&'),
				timeout: 40000,
				cache:   lru
			} ).success(function ( data ) {
					deferred.resolve( data );
				} ).error( function ( reason ) {
//					console.log( reason );
					deferred.reject( reason );
				} );
			return deferred.promise;
		}

		return {
			findById : function(id){
				return findById(id);
			},
			search : function(params){
				return search(params);
			}
		}
  });
