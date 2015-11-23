/**
 * Created by sergey on 23.11.15.
 */
var express = require("express");
var http    = require("http");
var url     = require("url");
var path    = require("path");

var app = express();

app.set("port", 3000);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port: " + app.get('port'));
});


app.use(function(req, res, next) {
    if(req.url == '/') {
        res.end("Hello");
    } else {
        next();
    }

});

app.use(function(req, res) {
    res.send(404, "Page not found, sorry.");
});