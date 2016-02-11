var express = require('express');
var router = express.Router();
var SongService = require('../services/songs');
var _ = require('lodash');

router.get('/add', function(req, res) {
    if (req.accepts('text/html')) {
        return res.render('addsong');
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});
router.get('/', function(req, res) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        SongService.findAll()
            .then(function(songs) {
                if (!songs) {
                    res.status(404).send({err: 'No songs in database'});
                    return;
                }
                if (req.accepts('text/html')) {
                    return res.render('songs', {songs: songs});
                }
                if (req.accepts('application/json')) {
                    return res.status(200).send(songs);
                }
            })
        ;
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});
/*router.get('/:id', function(req, res) {
    SongService.findOneByQuery({_id: req.params.id})
        .then(function(song) {
            if (!song) {
                res.status(404).send({err: 'No song found with id' + req.params.id});
                return; // important !!
            }
            res.status(200).send(song);
        })
    ;
});*/
router.get('/:id', function(req, res) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        SongService.findOneByQuery({_id: req.params.id})
            .then(function(song) {
                if (!song) {
                    res.status(404).send({err: 'No song found with id' + req.params.id});
                    return;
                }
                if (req.accepts('text/html')) {
                    return res.render('song', {song: song});
                }
                if (req.accepts('application/json')) {
                    return res.status(200).send(song);
                }
            })
        ;
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});
router.post('/', function(req, res) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        SongService.create(req.body)
            .then(
                function (song) {
                    if (req.accepts('text/html')) {
                        return res.render('song', {song: song});
                    }
                    if (req.accepts('application/json')) {
                        return res.status(201).send(song);
                    }
                }
            )
            .catch(
                function (err) {
                    res.status(500).send(err);
                }
            )
        ;
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});
router.put('/:id', function(req, res) {
    // req.body = _.omit(req,'_id');
    SongService.update({_id: req.params.id},req.body)
        .then(
            function (song) {
                res.status(201).send(song);
            }
        )
        .catch(
            function (err) {
                res.status(500).send(err);
            }
        )
    ;
});
module.exports = router;