var express = require("express");
var app = express();
const keys = require("./keys.js")
/////////////////////////////////////////////////

const MongoClient = require('mongodb').MongoClient;
const uri = keys["mongoUri"];

let db;
/////////////////////////////////////////////////
var bodyParser = require('body-parser');
app.use(express.json({ extended: false }));
var fs = require('fs');
const path = require("path");
// Load the AWS SDK for Node.js
//var AWS = require('aws-sdk');

// Set the region 
/*AWS.config.update({
    region: "us-east-1",
    accessKeyId: keys.AWSAccessKeyId,
    secretAccessKey: keys.AWSSecretKey,
});*/
//look into dotenv
//const Misc = require("./Models/Misc");

//s3 = new AWS.S3();

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, _db) => {
    if (!err) {
        console.log("Successfully connected to MongoDB");
        db = _db.db("db");
    }
    else
        console.log("Error in the connectivity");
})
var testingLocally = true;

if (testingLocally) {
    var port = 3000;
    var ip = "192.168.1.150";

    app.listen(port, function (err) {
        if (err) console.log(err);
        console.log("Listening on " + ip + ":" + port);
    });
    app.get("/", async function (req, res) {
        res.send("<h3>Server is up and Running</h3>");
    });
} else {
    var app = require("./server.js");
}

app.use(express.static(__dirname + './../web/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + './../web/');
app.get("/join/:teamID", async function (req, res) {
    res.render('joinTeam.html', { teamID: req.params.teamID });
});
app.post("/api/createUser", async function (req, res) {

    db.collection("users").insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    //Code needed tp verify that user allows texts 
});
app.post("/api/removeUser", async function (req, res) {

    db.collection("users").deleteOne({ "uid": req.body.uid }, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.post("/api/createTeam", async function (req, res) {

    db.collection("teams").insertOne({ "leader": req.body.leader, "members": [] }, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.post("/api/joinTeam", async function (req, res) {

    db.collection("teams").insertOne({ "tid": req.body.tid }, { "$push": { "members": req.body.mid } }, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.post("/api/deleteTeam", async function (req, res) {

    db.collection("team").deleteOne({ "tid": req.body.tid }, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});