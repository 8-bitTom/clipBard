'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * clip Schema
 */
var ClipSchema = new Schema({
	title : String,
	authName : String,
	authId : String,
	tags : [String],
	content : String,
	privileges : {
		type: Number,
		default: 2
	},
	updated: { type: Date, default: Date.now }
});

/**
 * Pre-save hook
 */
ClipSchema
	.pre('save', function(next) {
		if (!this.isNew) return next();

		if (!this.content && !this.title)
			next(new Error('Please add both a title and content to your clip'));
		else
			next();
	});


mongoose.model('Clip', ClipSchema);