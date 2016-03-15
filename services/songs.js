'use strict'
var Promise = require('bluebird');
var Songs = Promise.promisifyAll(require('../database/songs'));
var Rating = Promise.promisifyAll(require('../database/rating'));
var _ = require('lodash');

exports.find = function(query) {
    return Songs.findAsync(query);
};

exports.findOneByQuery = function(query) {
    return Songs.findOneAsync(query);
};

exports.create = function(song) {
    return Songs.createAsync(song);
};

exports.deleteAll = function() {
    return Songs.removeAsync();
};

exports.updateSongById = function(songId, songToUpdate) {
    // return Songs.updateAsync({_id: songId}, songToUpdate); // updates but doesn't return updated document
    return Songs.findOneAndUpdateAsync({_id: songId}, songToUpdate, {new: true}); // https://github.com/Automattic/mongoose/issues/2756
};

exports.getTopSongsByRating = function(limit) {
    var ratingSongs = [];
    limit = typeof limit !== 'undefined' ? limit : 5;
    return Rating.aggregateAsync([
            {$group: {_id: "$song", avgRating: {$avg: "$rating"}}},
            {$sort: {avgRating: -1}},
            {$limit: limit}
        ])
        .then(function(rating) {
            var ids = _.map(rating, '_id');
            ratingSongs = rating;
            return Songs.find({_id: {$in: ids}});
        })
        .then(function (songs) {
            return _.map(ratingSongs, function(n) {
                var rating = _.clone(n);
                rating.song = _.find(songs, {_id: n._id});
                return rating;
            });
        })
    ;
};