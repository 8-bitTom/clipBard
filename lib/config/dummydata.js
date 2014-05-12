'use strict';

var mongoose = require( 'mongoose' ),
	User = mongoose.model( 'User' ),
	Thing = mongoose.model( 'Thing' ),
	Clip = mongoose.model( 'Clip' ),
	lipsum = require( 'lorem-ipsum' );

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find( {} ).remove( function () {
	Thing.create( {
			name:        'HTML5 Boilerplate',
			info:        'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
			awesomeness: 10
		}, {
			name:        'AngularJS',
			info:        'AngularJS is a toolset for building the framework most suited to your application development.',
			awesomeness: 10
		}, {
			name:        'Karma',
			info:        'Spectacular Test Runner for JavaScript.',
			awesomeness: 10
		}, {
			name:        'Express',
			info:        'Flexible and minimalist web application framework for node.js.',
			awesomeness: 10
		}, {
			name:        'MongoDB + Mongoose',
			info:        'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
			awesomeness: 10
		}, function () {
			console.log( 'finished populating things' );
		}
	);
} );

//clear old Clips, and add dummy Clips
Clip.find( {} ).remove( function () {
	for ( var i = 0; i < 400; i++ ) {
		var users = [
			{name : 'Test User', id :'5368111fcd1cbd9b405e4a35'},
			{name : 'Tom', id :'536a7452c91b22d95d2a0dbb'},
			{name : 'Jhonny', id :'536bcdc986ec5f20767f4653'},
			{name : 'Jake the Dog', id :'536bcdf286ec5f20767f4654'},
			{name : 'Finn the Human', id :'536bce0b86ec5f20767f4655'}
		]
		var priv = Math.floor(Math.random() * 4);
		var user = Math.floor(Math.random() * 4);
		var title = lipsum({count : 1, units: 'sentences', format: 'plain'});
		var text = lipsum({count : 1, units: 'paragraphs', format: 'plain'});
		var time = new Date();

		Clip.create( {
			title:      title,
			authName:   users[user].name,
			authId:     users[user].id,
			tags:       ['test', 'beep Boop'],
			content:    text,
			privileges: priv,
			editable : true,
			updated:    time
		} );
	}

	console.log('finished Creating Dummy Clips');
} );

// Clear old users, then add a default user
//User.find({}).remove(function() {
//  User.create({
//    provider: 'local',
//    name: 'Test User',
//    email: 'test@test.com',
//    password: 'test'
//  }, function() {
//      console.log('finished populating users');
//    }
//  );
//});
