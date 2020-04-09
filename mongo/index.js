var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/Me');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

var UsersSchema = mongoose.Schema({
  id : {type : String},
  passwd : {type : String},
  token : {type: String}
});

var MessageSchema = mongoose.Schema({
  phone : {type: String, required: true},
  data : {type: String, required: true},
  nowDate : {type : String},
  userToken : {type: String},
  docNum : {type: Number},
  token : {type: String}
});


Users = mongoose.model('users', UsersSchema);
Message = mongoose.model('message', MessageSchema);

exports.Users = Users;
exports.Message = Message;