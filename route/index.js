var express = require('express');
var router = express.Router();

// middleware specific to this router
//router.use(function timeLog(req, res, next) {
//    console.log('Time: ', Date.now());
//    next();
//})

router.get('/topic', function (req, res) {
    res.status(200).send('Get all topics');
});

router.get('/topic/:id', function(req, res){
    res.status(200).send('Get topic ' + req.params.id);
});

router.post('/topic', function (req, res) {
    res.status(201).send('Create topic');
});

router.put('/topic/:id', function (req, res) {
    res.status(200).send('Update topic ' + req.params.id);
});

router.delete('/topic/:id', function (req, res) {
    res.status(200).send('Delete topic ' + req.params.id);
});

module.exports = router;
