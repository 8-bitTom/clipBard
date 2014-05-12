'use strict';

var mongoose = require('mongoose'),
	extend = require('node.extend' ),
	Clip = mongoose.model('Clip' );

/**
 * Create clip
 */
exports.create = function (req, res, next) {
	var newClip = new Clip(req.body);
	newClip.save(function(err) {
		if (err) return res.json(400, err);
		return res.json(newClip);
	});
};

/**
 *  Get a Clip
 */
exports.show = function (req, res, next) {
	var clipId = req.params.id;

	Clip.findById(clipId, function (err, clip) {
		if (err) return next(err);
		if (!clip) return res.send(404);

		res.send(clip);
	});
};

/**
 *  Search Clips
 */
exports.find = function (req, res, next) {
	var query = {};

	function callback(err, clips){
		if (err) return next(err);
		if (!clips) return res.send(404);

		var pageStart = 0;

		var response = {
			totalLength : clips.length,
			page : 1,
			totalPages : 1,
			length : clips.length,
			clips : clips
		};

		if(req.query.limit){
			req.query.limit = req.query.limit -0;
			response.limit = req.query.limit;
			response.totalLength = clips.length;
			response.totalPages = Math.ceil(clips.length / req.query.limit);
			if(req.query.page){
				req.query.page = req.query.page - 0;
				response.page = req.query.page - 0;
				pageStart = req.query.limit * (req.query.page - 1);
				response.clips = clips.slice( pageStart, (pageStart + req.query.limit) );
				response.length = response.clips.length;
				if( (req.query.page) > response.totalPages){
					return res.send({error : 'Selected page is greater than total pages'});
				}
			}else{
				response.clips = clips.slice(0, req.query.limit);
			}
		}

		res.send(response);
	}

	function makeRegExp(item){
		return new RegExp(item, "gi");
	}

	function makeOrRegexp(list){
		var scheme = list.split(',');
		return  {$in : scheme};
	}

	//make search items regular expressions and save to our query object
	for(var key in req.query){
		switch(key){
			case 'title':
				query.title = makeRegExp(req.query.title);
				break;
			case 'author':
				query.authName = makeRegExp(req.query.author);
				break;
			case 'aId' :
				query.authId = req.query.aId;
				break;
			case 'id' :
				query._id = req.query.id;
				break;
			case 'privileges' :
				query.privileges = makeOrRegexp(req.query.privileges);
		}
	}

	//create our seach Item
	var search = Clip.find(query);
	if(req.query.sort){
		search.sort(req.query.sort);
	}

	//granular stuff
	search.exec(callback);

};

/**
 *  Update Clip
 */
exports.update = function (req, res, next) {
	var id = req.body._id;
	Clip.findById(id, function(err, clip){
		extend(clip, req.body);
		clip.updated = new Date();
		clip.save(function(err) {
			if (err) return res.send(400);

			res.send(200);
		});
	});
};