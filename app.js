/**
 * Created by sergey on 23.11.15.
 */
var express     = require("express");
var http        = require("http");
var config      = require("./config");
var log         = require("./libs/log")(module);
var route       = require("./route");
var mongoose    = require('mongoose');

var app = express();

app.use('/', route);

app.set("port", config.get("port"));

http.createServer(app).listen(app.get('port'), function(){
    log.info("Express server listening on port: " + config.get("port"));
});


mongoose.connect('mongodb://localhost/test');



