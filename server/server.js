var express = require('express');
var cors = require('cors')
const path = require("path");

var app = express();
app.use(cors());

require("greenlock-express")
    .init({
        packageRoot: __dirname,

        // contact for security and critical bug notices
        configDir: "./greenlock.d",

        maintainerEmail: "eugene.rozental@gmail.com",

        // whether or not to run at cloudscale
        cluster: false
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);

app.use("/", express.static('/'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './../web/index.html'));
});

module.exports = app;