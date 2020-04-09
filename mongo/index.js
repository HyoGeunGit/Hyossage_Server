var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

MONGODB_URI='mongodb://shimhg02:adad123@ds133557.mlab.com:33557/heroku_wh8bw68p'
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });


var UsersSchema = mongoose.Schema({
  id : {type : String},
  name: {type : String},
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