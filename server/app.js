const cors = require('cors');
const morgan = require('morgan');
const express = require( 'express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const validator = require('validator');

const { User } = require('./model/User/userSchema');
const CONST = require( './constants' );
const { PORT, URL_DB, secret } = CONST;

const newsRout = require('./routes/news');
const friendsRout = require('./routes/friends');
const userRout = require('./routes/users');

const app = express();
const db = mongoose.connection;
mongoose.connect( URL_DB );
db.on( 'error', console.error.bind( console, 'CONNECT DB ERROR:' ) );
db.once( 'open', () =>{ console.log( 'CONNECT DB' )});

app.use(cors());
app.use('/static', express.static(__dirname + '/public'));
app.use(morgan("dev"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

///   NewRouts!!!
app.use("/api/posts", newsRout);

///   OldRouts!!!
app.use("/api/user", userRout);
app.use("/api/user/news", newsRout);
app.use("/api/user/friends", friendsRout);

app.listen(PORT, () => {
  console.log(`listening on port ${ PORT }`);
});
