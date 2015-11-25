

var Topic = require("./models/topic").Topic;

var topic = new Topic({
    title: "Test"
});

topic.save(function(err, topic, affected){
    console.log(arguments);
});