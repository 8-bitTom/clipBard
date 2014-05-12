'use strict';

angular.module( 'clipBardApp' )
	.controller( 'MainCtrl', function ( $scope, Clips ) {
		$scope.loading = true;
		$scope.pagination= {
			page : 1,
			maxLinks : 5,
			totalItems : 10,
			limit : 10
		};

		var searchObj = {
			limit : 20,
			privileges : [1,2],
			sort: 'updated'
		}

		function update(){
			Clips.search( searchObj ).then( function ( data ) {
				$scope.clips = data;
				$scope.pagination.page = data.page;
				$scope.pagination.totalItems = data.totalLength;
				$scope.pagination.limit = data.limit;
				$scope.loading = false;
			} );
		}

		$scope.$watch( function () {
			return $scope.pagination.page;
		}, function ( newVal, oldVal ) {
			if ( newVal !== oldVal ) {
				searchObj.page = newVal
				update();
			}
		} );

		//init
		update();

	} );
