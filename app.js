const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rndstring = require('randomstring');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({limit: '10gb'}));
app.use(bodyParser.urlencoded({limit: '10gb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./mongo');


require('./routes/auth')(app,Users,rndstring);
require('./routes/notice')(app, Message,rndstring);
let port = 6101;

app.listen(port, ()=>{
  console.log('Server Porting On ' + port);
})

module.exports = app;
