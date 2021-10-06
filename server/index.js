var express = require("express");
var app = express();
app.use(express.json({ extended: false }));
var fs = require('fs');
const keys = require("./keys.js")
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

//
/*require("./db/db").connectDB(function (err) {
    if (err) {
        console.log("Connection to MongoDB was unsuccessful");
        process.exit(1);
    } else {
        console.log("Connected to MongoDB database");
    }
});*/
var testingLocally = false;

if (testingLocally == true) {
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
