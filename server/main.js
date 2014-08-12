// import node modules
var http    = require("http");
var express = require('express');
var db      = require("./db.js");

var app  = express();
var port = 3003;
var ip   = "127.0.0.1";

app.configure(function () {
  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser());
  
});

// enable cors
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// message routes 
app.get('/messages', db.findAllMessages);
// TODO: app.get('/messages/:room', db.findForRoom); 
app.post('/messages', db.addMessage);
app.delete('/message/:id', db.deleteMessage);

// room routes
app.get('/rooms', db.findAllRooms);
app.get('/rooms/:id', db.findRoomById);
app.post('/rooms', db.addRoom);
app.put('/rooms/:id', db.updateRoom);
app.delete('/rooms/:id', db.deleteRoom);

app.listen(port);
console.log('Listening on port ' + port);


