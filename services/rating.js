'use strict'
var Promise = require('bluebird');
var Rating = Promise.promisifyAll(require('../database/rating'));

exports.findOneByQuery = function(query) {
    return Rating.findOneAsync(query);
};

exports.create = function(rating) {
    return Rating.createAsync(rating);
};