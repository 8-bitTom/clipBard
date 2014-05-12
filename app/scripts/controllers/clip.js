'use strict';

angular.module('clipBardApp')
  .controller('ClipCtrl', function ($scope, Clips, $routeParams) {

		function update(){
			Clips.findById( $routeParams.id ).then( function ( data ) {
				$scope.clip = data;
			} );
		}

		update();
  });
