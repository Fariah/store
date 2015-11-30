var express = require('express');
var util = require('util');
var Topic = require(".././models/topic").Topic;

var errorText = 'There have been an error: ';

var router = express.Router();

// Get all topics
router.get('/topic', function (req, res) {
    Topic.find({}, function(err, topics) {
        if(err){
            res.status(404).send(errorText + util.inspect(err));
            return;
        }
        res.status(200).send(topics);
        return;
    });


});

// Get topic by id
router.get('/topic/:id', function(req, res){
    Topic.findById(req.params.id, function(err, topic) {
        if(err){
            res.status(404).send(errorText + util.inspect(err));
            return;
        }
        res.status(200).send(topic);
        return;
    });
});

//Create new topic
router.post('/topic', function (req, res) {

    req.checkBody({
        'title': {
            notEmpty: true,
            isLength: {
                options: [2, 20],
                errorMessage: 'Must be between 2 and 20 chars long' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid title'
        },
        'parent_id': { //
            optional: true, // won't validate if field is empty
            errorMessage: 'Invalid parent id'
        }
    });

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errorText + util.inspect(errors));
        return;
    }

    var record = new Topic({ title: req.body.title, parent_id: req.body.parent_id });

    record.save(function (err, topic, affectef) {
        if (err) {
            res.status(500).send(errorText + util.inspect(err));
            return;
        }
        res.status(201).end();
        return;
    })
});

// Update topic by id
router.patch('/topic/:id', function (req, res, next) {

    req.checkBody({
        'title': {
            optional: true, // won't validate if field is empty
            isLength: {
                options: [2, 20],
                errorMessage: 'Must be between 2 and 20 chars long' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid title'
        },
        'parent_id': { //
            optional: true, // won't validate if field is empty
            errorMessage: 'Invalid parent id'
        }
    });

    req.checkParams({
        'id': {
            notEmpty: true,
            errorMessage: 'Invalid id'
        }
    });

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errorText + util.inspect(errors));
        return;
    }

    Topic.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title, parent_id: req.body.parent_id }}, function (err, topic) {
        if (err) {
            res.status(500).send(errorText + util.inspect(err));
            return;
        }
        res.status(200).end();
        return;
    });
});


// Delete topic by id
router.delete('/topic/:id', function (req, res) {
    req.checkParams({
        'id': {
            notEmpty: true,
            errorMessage: 'Invalid id'
        }
    });

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errorText + util.inspect(errors));
        return;
    }

    Topic.findByIdAndRemove(req.params.id, function (err, topic) {
        if (err) {
            res.status(500).send(errorText + util.inspect(err));
            return;
        }
        res.status(204).end();
        return;
    });
});

module.exports = router;
