var express         = require('express');
var actions    = require(".././controllers/topicController");

//почему тут undefined а в контроллере JSON?
console.log(actions.getAll());

var router = express.Router();


router.get('/topic', function (req, res) {

    res.status(200).send(actions.getAll());
});

router.get('/topic/:id', function(req, res){
    res.status(200).send(actions.getTopic(req.params.id));
});

router.post('/topic', function (req, res) {
    res.status(201).send(actions.createTopic({"title": "topic_title"}));
});

router.put('/topic/:id', function (req, res) {
    res.status(200).send(actions.updateTopic(req.params.id));
});

router.delete('/topic/:id', function (req, res) {
    res.status(200).send(actions.deleteTopic(req.params.id));
});

module.exports = router;
