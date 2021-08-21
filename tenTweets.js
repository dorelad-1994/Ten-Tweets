const express = require("express");
const Twit = require('twit');
const os = require('os');
const os_utils = require('os-utils');

const PORT = 8080;
const app = express()

app.listen(PORT,function (req,res){});

//get last 10 tweets of a string 
app.get('/tweets', function(req, res) {
  if(req && (req.query.query != null || req.query.query == '') ){ 
  let query = req.query.query;
  tweets(res,query); 
  }else{
    res.send("Query is Null please write legal query")
  }
});

function tweets(res,query) {

const apikey = 'bYKe7uQZP8VyMIT4XIl0XBYD2';
const apiSecretKey =  'ZZb3RrGf4nEH5Unjh17nmbgFPTk2Ke9Sd7r75dEUtHgbLhs3Fs';
const access_token =  '1405521447112511507-9VtW59h37aa4sdWSC5l677rIwGaxlO';
const access_token_secret = 'zeXFzx9hqJxD5wpFKvi398Y0heKvFG1g21LmLeyAcXVmy';

const T= new Twit({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token: access_token,
    access_token_secret: access_token_secret,
});

T.get('search/tweets', { q: query, count:10 }, function(err, data, response) {
  res.send(data.statuses);
  })
}

//get health check of my service
app.get('/health', function(req, res) {
  health(res);
});

function health (res) {
  return os_utils.cpuUsage(function (pre){res.send(details(pre))});
};

function details(pre) {
  return 'OS name: ' +  os.version + '<br/>' 
  + 'Language/platform version: ' + process.version +  '<br/>'
  + 'Memory Usage (%): ' + (100*(1- (os.freemem / os.totalmem))) +'<br/>' 
  + 'CPU Usage (%): ' + pre*100; 
}
