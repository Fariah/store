var Topic = require(".././models/topic").Topic;

var topicActions = function() {};

topicActions.prototype.getAll = function() {
    var topicList = {};
    Topic.find({}, function(err, topics) {
        topics.forEach(function(topic) {
            topicList[topic._id] = topic;
        });

    });
    console.log(topicList);
    return topicList;

};

topicActions.prototype.getTopic = function(id) {
    return "Get topic: " + id;
};

//не совсем понятно как тут правильнее сделать, как передавать параметры
topicActions.prototype.createTopic = function(args) {
    return "Create topic: " + args.title;
};

topicActions.prototype.updateTopic = function(id) {
    return "Update topic: " + id;
};

topicActions.prototype.deleteTopic = function(id) {
    return "Delete topic: " + id;
};

module.exports = new topicActions;
