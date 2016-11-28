var express = require('express')
var app = express();
app.get("/", function(request, response) {  response.end("Welcome to the homepage!");})
app.get("/new/:url(*)", function(req, res) {res.end("Hello, " + req.params.url + ".");})


app.listen(process.env.PORT || 3000);
