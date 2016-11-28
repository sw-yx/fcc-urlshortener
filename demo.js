var express = require('express')
var app = express();
var mongo = require('mongodb').MongoClient
var shortid = require('shortid');

var url = 'mongodb://swyx:Qt72nWPyNByw@ds111798.mlab.com:11798/heroku_p414n7r6'


app.get("/", function(request, response) {  response.end("Welcome to the homepage!");})
app.get("/:sid", function(req, res) {  
    mongo.connect(url, function(err, db) {
       if (err) throw err
       var col = db.collection('fcc-urlshortener')
       console.log('yay')
       col.find({_id:req.params.sid},{url:1,_id:0}).toArray(function(err,docs){
           if (err) throw err
           console.log ('yay2')
           if (docs.length<1) {
               res.end('no URL with shortcode ' + req.params.sid + ' found.')
           } else {
           res.writeHead(301,
            {Location: docs[0].url});
            res.end()
           }
       })
       db.close()
    })
    //res.end('hi')
})

app.get("/new/:url(*)", function(req, res) {
    var sid = shortid.generate();
    mongo.connect(url, function(err, db) {
       if (err) throw err
       var col = db.collection('fcc-urlshortener')
       console.log('yay')
       col.insert({_id: sid, url:req.params.url})
       db.close()
        //var doc = {firstName:process.argv[2],lastName:process.argv[3]}
        //parrots.insert(doc,function(err,data){if (err) throw err})
    })
    res.end("Logged this URL, " + req.params.url + ". Your Shortid is " + sid)
    
    })


app.listen(process.env.PORT || 3000);
