var express = require('express');
var Topic = require(".././models/topic").Topic;

var router = express.Router();


router.get('/topic', function (req, res) {
    var topicList = {};
    Topic.find({}, function(err, topics) {
        topics.forEach(function(topic) {
            topicList[topic._id] = topic;
        });

    });

    res.status(200).send(topicList);
});

router.get('/topic/:id', function(req, res){

    console.log('as: ', req.params.id);
    var topicResult = {};

    Topic.findById(req.params.id, function(err, topic) {
        console.log("topic: ", topic);
        console.log("err: ", err);
        topicResult = topic;
    });

    console.log("topicResult: ", topicResult);

    res.status(200).send("Get topic: "+topicResult.title);
});

router.post('/topic', function (req, res) {

    if(req.body.title) {
        var title = req.body.title;
    } else {
        //throw new Error("Неправильный формат данных title");
        res.status(400).send('Неправильный формат JSON, нужно {"title": "bbbb"}');
    }
    var parent = req.body.parent_id ? req.body.parent_id : null;

    var record = new Topic({ title: title, parent_id: parent });

    record.save(function (err, topic, affectef) {
        if (err) return errorHandler(err);
    })

    res.status(201).send("Topic " + title + " was created");
});

router.put('/topic/:id', function (req, res) {
    res.status(200).send("Update topic");
});

router.delete('/topic/:id', function (req, res) {
    res.status(200).send("Delete topic");
});

module.exports = router;
