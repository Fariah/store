/**
 * Created by sergey on 23.11.15.
 */
var express = require("express");
var bodyParser = require('body-parser');
var http = require("http");
var config = require("./config");
var log = require("./lib/log")(module);
var route = require("./route");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', route);


app.set("port", config.get("port"));

http.createServer(app).listen(app.get('port'), function(){
    log.info("Express server listening on port: " + config.get("port"));
});




