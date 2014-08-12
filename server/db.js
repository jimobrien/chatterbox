// modules
var mongo = require('mongodb');

// mongo references
var Server = mongo.Server;
var Db     = mongo.Db;
var BSON   = mongo.BSONPure;

// mongo instances
var server = new Server('localhost', 27017, { auto_reconnect: true });
var db     = new Db('Chatterbox', server);


// initialize database
db.open( function (err, db) {
  if ( !err ) {
    console.log("Connected to 'Chatterbox' database");
    db.collection(  'messages', { strict: true }, function (err, collection) {
      if ( err ) {
        console.log("The 'messages' collection doesn't exist. Creating it with sample data...");
        populateMessagesDB(); // temporary
      }
    });

    db.collection(  'rooms', { strict: true }, function (err, collection) {
      if ( err ) {
        console.log("The 'rooms' collection doesn't exist. Creating it with sample data...");
        populateRoomsDB(); // temporary
      }
    });
  }
});


// message routes
exports.findMessageById = function (req, res) {
  var id = req.params.id;
  console.log('Retrieving message: ' + id);
  db.collection( 'messages', function (err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {
      res.send( item );
    });
  });
};

exports.findAllMessages = function (req, res) {
  db.collection( 'messages', function (err, collection) {
    collection.find().toArray( function (err, items) {
      res.send( items );
    });
  });
};

exports.addMessage = function (req, res) {
  var message = req.body;
  console.log('Adding message: ' + JSON.stringify(message));
  db.collection( 'messages', function (err, collection) {
    collection.insert(message, { safe: true }, function (err, result) {
      if (err) {
        res.send( {'error':'An error has occurred'} );
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send( result[0] );
      }
    });
  });
};

exports.updateMessage = function (req, res) {
  var id = req.params.id;
  var message = req.body;
  console.log('Updating message: ' + id);
  console.log(JSON.stringify(message));
  db.collection( 'messages', function (err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, message, { safe: true }, function (err, result) {
      if (err) {
        console.log('Error updating message: ' + err);
        res.send( {'error':'An error has occurred'} );
      } else {
        console.log('' + result + ' document(s) updated');
        res.send( message );
      }
    });
  });
};

exports.deleteMessage = function (req, res) {
  var id = req.params.id;
  console.log('Deleting message: ' + id);
  db.collection( 'messages', function (err, collection) {
    collection.remove( { '_id': new BSON.ObjectID(id) }, { safe: true }, function (err, result) {
      if (err) {
        res.send( {'error':'An error has occurred - ' + err} );
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send( req.body );
      }
    });
  });
};


// room routes
exports.findRoomById = function (req, res) {
  var id = req.params.id;
  console.log('Retrieving room: ' + id);
  db.collection( 'rooms', function (err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {
      res.send( item );
    });
  });
};

exports.findAllRooms = function (req, res) {
  db.collection( 'rooms', function (err, collection) {
    collection.find().toArray( function (err, items) {
      res.send( items );
    });
  });
};

exports.addRoom = function (req, res) {
  var room = req.body;
  console.log('Adding room: ' + JSON.stringify(room));
  db.collection( 'rooms', function (err, collection) {
    collection.insert(room, { safe: true }, function (err, result) {
      if (err) {
        res.send( {'error':'An error has occurred'} );
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send( result[0] );
      }
    });
  });
};

exports.updateRoom = function (req, res) {
  var id = req.params.id;
  var room = req.body;
  console.log('Updating room: ' + id);
  console.log(JSON.stringify(room));
  db.collection( 'rooms', function (err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, room, { safe: true }, function (err, result) {
      if (err) {
        console.log('Error updating room: ' + err);
        res.send( {'error':'An error has occurred'} );
      } else {
        console.log('' + result + ' document(s) updated');
        res.send( room );
      }
    });
  });
};

exports.deleteRoom = function (req, res) {
  var id = req.params.id;
  console.log('Deleting room: ' + id);
  db.collection( 'rooms', function (err, collection) {
    collection.remove( { '_id': new BSON.ObjectID(id) }, { safe: true }, function (err, result) {
      if (err) {
        res.send( {'error':'An error has occurred - ' + err} );
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send( req.body );
      }
    });
  });
};


// Populate database with sample data
// Only used the first time the application is started
var populateMessagesDB = function () {

  var messages = [
  {
      username: "aCooluser",
      text: "an even cooler message...",
      createdAt: new Date()
  },
  {
      username: "ello",
      text: "ello ello",
      createdAt: new Date()
  }];

  db.collection( 'messages', function (err, collection) {
      collection.insert( messages, { safe: true }, function (err, result) {} );
  });
};

var populateRoomsDB = function () {

  var rooms = [
  {
      name: "World",
      createdAt: new Date()
  },
  {
      name: "Niche Topic",
      createdAt: new Date()
  }];

  db.collection( 'rooms', function (err, collection) {
      collection.insert( rooms, { safe: true }, function (err, result) {} );
  });
};