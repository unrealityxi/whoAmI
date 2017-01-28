var express = require("express");
var engines = require("consolidate");
var path = require("path");
var url = require("url");
var whoAmI = require("./logic/whoAmI");


var PORT = process.env.PORT || 3000;

var app = express();

app.engine("html", engines.nunjucks);
app.set("view engine", "html");
app.set("views", path.resolve(__dirname + "/views"));

app.use(function(req, res, next){
  req.config = whoAmI(req);
  next();
});

app.get("/", function(req, res){
  
  var cfg = req.config;
  
  cfg.sheerApi = url.path + "/api";
  res.render("index", cfg);
});

app.get("/api", function(req, res){
  
  var cfg = req.config
  res.status(200).send(cfg);
  
})


app.use(function(err, req, res, next){
  console.log(err);
  res.status(404).end("Something broke!");
});



app.listen(PORT, console.log("app runing on port: " + PORT));