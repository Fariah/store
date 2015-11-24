/**
 * Created by sergey on 23.11.15.
 */
var express = require("express");
var http    = require("http");
var config  = require("./config");
var log     = require("./libs/log")(module);


var app = express();

app.set("port", config.get("port"));

http.createServer(app).listen(app.get('port'), function(){
    log.info("Express server listening on port: " + config.get("port"));
});

app.get('/', function (req, res) {
    res.status(200).send('Index page!');
});

app.get('/topic', function (req, res) {
    res.status(200).send('Get all topics');
});

app.get('/topic/:id', function(req, res){
    res.status(200).send('Get topic ' + req.params.id);
});

app.post('/topic', function (req, res) {
    res.status(201).send('Create topic');
});

app.put('/topic/:id', function (req, res) {
    res.status(200).send('Update topic ' + req.params.id);
});

app.delete('/topic/:id', function (req, res) {
    res.status(200).send('Delete topic ' + req.params.id);
});

app.use(function(req, res) {
    res.status(404).send("Page not found, sorry.");
});