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

    //Topic.aggregate([{$match: {parent_id: req.params.id}}], function(err, data){
    //    console.log(data);
    //    res.end();
    //});

    Topic.findById(req.params.id, function(err, topic) {
        if(topic){
            res.status(200).send("Get topic: " + topic.title);
        } else {
            res.status(404).send('Запись не найдена');
        }
    });
});

router.post('/topic', function (req, res) {

    if(req.body.title) {
        var title = req.body.title;
    } else {
        res.status(400).send('Неправильный формат JSON, нужно {"title": "bbbb"}');
    }
    var parentId = req.body.parent_id ? req.body.parent_id : null;

    if(parentId != null) {
        Topic.checkId(parentId, function(err, check) {
            if(!check) {
                res.status(404).send('Не правильное значение parent_id');
            }
        });
    }

    var record = new Topic({ title: title, parent_id: parentId });

    record.save(function (err, topic, affectef) {
        if (err) return errorHandler(err);
    })

    res.status(201).send("Topic " + title + " was created");
});

router.put('/topic/:id', function (req, res, next) {

    // valid

    // get topic by id
    return res.status(404).send({error: 'aaaa'});
    return res.status(404).end();


    topic.mm=mm;
    topic.save(function(err){
        if(err){
            return next(err);
        }
        return res.status(204).end();
    });
    /*

    if(!req.body.title) {
        res.status(400).send('Не правильное значение title в JSON');
    }



    Topic.checkId(req.params.id, function(err, check) {
        if(err){
            return next(new Error('aaa'));
            return next(err);
        }
        if(!check) {
            res.status(404).send('Не правильное значение id');
        }
    });
    Topic.checkId(req.body.parent_id, function(err, check) {
        if(!check) {
            res.status(404).send('Не правильное значение parent_id в JSON');
        }
    });

    Topic.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title, parent_id: req.body.parent_id }}, function (err, topic) {
        res.status(200).send("Update topic: " + req.body.title);
    });*/
});

router.delete('/topic/:id', function (req, res) {
    Topic.checkId(req.params.id, function(err, check) {
        if(!check) {
            res.status(404).send('Не правильное значение id');
        } else {
            Topic.findByIdAndRemove(req.params.id, function (err, topic) {
                res.status(200).send("Topic was deleted");
            });
        }
    });
});

module.exports = router;
