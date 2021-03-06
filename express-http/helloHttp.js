//test2
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var credentials = require('./credentials.js');
var request = require('request');
//var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=corvallis&APPID=';
var baseUrl = 'http://www.google.com';

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));
/*
app.get('/',function(req,res,next){
  var context = {};
  //request(baseUrl + credentials.owmKey, function(err, response, body){
  request("http://api.petfinder.com/shelter.find?location=77062&format=json&key=9a8453291b77fe54f8253684b2c135a6&x&token=3073e442d772677d9db40c5729c6295b", function(err, response, body){

     if(!err && response.statusCode < 400){
      context.owm = body;

      request({

        "url":"http://httpbin.org/post",
        "method":"POST",
        "headers":{
          "Content-Type":"application/json"
        },
        "body":'{"foo":"bar","number":1}'
      }, function(err, response, body){
        if(!err && response.statusCode < 400){
          context.httpbin = body;
          res.render('home',context);
        }else{
          console.log(err);
          if(response){
            console.log(response.statusCode);
          }
          next(err);
        }
      });
    } else  {
      console.log(err);
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});
*/
app.get('/',function(req,res,next){
  var context = {};
  //request(baseUrl + credentials.owmKey, function(err, response, body){
  request("http://api.petfinder.com/shelter.find?location=77062&format=json&key=9a8453291b77fe54f8253684b2c135a6&x", function(err, response, body){ 
    if(!err && response.statusCode < 400){
      context.owm = body;
      res.render('home',context);
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
