var express = require('express');
var _ = require('lodash');
var router = express.Router();
var UsersService = require('../services/users');

/* GET users listing. */
router.get('/', function (req, res) {
  if (req.accepts('text/html') || req.accepts('application/json')) {
    var queryParams = {};
    var hasFilter = false;

    if(Object.keys(req.query).length !== 0){
      queryParams[req.query.userFilter] = req.query.value;
      hasFilter = true;
    }

    UsersService.find(queryParams || {})
        .then(function(users){
          if (req.accepts('text/html')) {
            return res.render('users', {users: users, usersCount: users.length, hasFilter: hasFilter, name: req.query.value});
          }
          if (req.accepts('application/json')) {
            return res.status(200).send(users);
          }
        });
  }
  else {
    res.status(406).send({err: 'Not valid type for asked ressource'});
  }
});

router.put('/songs/favorites', function (req, res) {
  var song_id = req.body.song_id;
  UsersService.addFavorite(req.user._id, song_id)
      .then(function (song) {
        if (!song) {
          return res.status(404).send({err: 'No song found with id' + song_id});
        }
        if (req.accepts('text/html')) {
          return res.redirect('/songs/' + song_id);
        }
        if (req.accepts('application/json')) {
          return res.status(200);
        }
      })
      .catch(function (err) {
        return res.status(500).send(err);
      })
  ;
});

router.delete('/songs/favorites/remove', function (req, res) {
  var song_id = req.body.song_id;
  UsersService.removeFavorite(req.user._id, song_id)
      .then(function (song) {
        if (!song) {
          res.status(404).send({err: 'No song found with id' + song_id});
          return;
        }
        if (req.accepts('text/html')) {
          return res.redirect('/songs/' + song_id);
        }
        if (req.accepts('application/json')) {
          return res.status(200);
        }
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
});

module.exports = router;