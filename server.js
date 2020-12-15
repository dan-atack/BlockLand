// The Entry Point for our game from the Package.json file will be the server:

'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

// Experimental Micro-Database (for storing user submitted info from the game):

// We'll store semi-imaginary game data here (like save files and progress):
let dataBase = [];
// We'll store all the username/password combos here so people can log in:
let users = {
  username: 'password',
  Dan: '',
};
// The user will need to log in to play, and this field will keep track of their name:
let currentUser = '';

// End of database area :)

const handleTest1 = (req, res) => {
  let reply = 'Fellow';
  res.send(JSON.stringify(reply));
};

const handleTest2 = (req, res) => {
  let theTime = new Date();
  let timeString = `${theTime.getHours()}:${theTime.getMinutes()}:${theTime.getSeconds()}`;
  res.send(JSON.stringify(timeString));
};

const handleWorldChange = (req, res) => {
  let data = req.body;
  const { time, progressReport } = data;
  const dataTuple = [progressReport, time];
  dataBase.push(dataTuple);
  res.send(JSON.stringify(`${dataTuple[0]} reached at ${dataTuple[1]}.`));
};

const handleUserId = (req, res) => {
  // if the user is signed in, return their name when the game page asks for it; else return null to redirect them to the signin page:
  let reply = '';
  if (currentUser.length != 0) {
    reply = JSON.stringify(currentUser);
  } else {
    reply = JSON.stringify(null);
  }
  res.send(reply);
};

// This function verifies if you are an existing user, and if so, whether you've entered the correct password...
// If these criteria are both true, then you can go ahead and play the game:
const handleLogin = (req, res) => {
  const { username, password } = req.body;
  let responseBody = {
    status: 'success',
    error: null,
    username: username,
    info: '',
  };
  // if name is on the list and the pw is good:
  if (Object.keys(users).includes(username) && users[username] == password) {
    currentUser = username;
    res.status(200);
    res.send(JSON.stringify(responseBody));
    // if the name is good but the pw isn't:
  } else if (Object.keys(users).includes(username)) {
    responseBody.status = 'error';
    responseBody.error = 403;
    responseBody.info = 'Password incorrect.';
    res.send(JSON.stringify(responseBody));
    // if nothing matches, ask the user to sign up a new account:
  } else {
    responseBody.status = 'error';
    responseBody.error = 402;
    responseBody.info = 'Username not found in server database.';
    res.send(JSON.stringify(responseBody));
  }
};

// If someone is logging in for the first time, they will be asked to send a name/password to the server;
// The server will check if the name is available, and if so,
// it will add this name/pw combo to the users list, and make the given username the current User...
// if the name is already taken it will send a message to that effect:
const handleNewUser = (req, res) => {
  const { username, password } = req.body;
  let responseBody = {
    status: 'success',
    error: null,
    username: username,
    info: '',
  };
  // Check if name exists in users database:
  if (Object.keys(users).includes(username)) {
    console.log('name taken');
    (responseBody.status = 'error'),
      (responseBody.error = 406),
      (responseBody.info =
        'Sorry, that name is already taken. If you are a returning user, please sign in with your password, otherwise please choose a different username and try again.');
    // if the name is original then add it to the users database and set it as the current user:
  } else {
    res.status(200);
    users[username] = password;
    currentUser = username;
    console.log(users);
  }
  // Then send back the response body:
  res.send(JSON.stringify(responseBody));
};

// Logging Out:

const handleLogout = (req, res) => {
  currentUser = '';
  res.send(JSON.stringify('logout successful.'));
};

// Launching the Map Editor:

const handleMapEditor = (req, res) => {
  res.status(200);
  res.send(JSON.stringify('Map Editor Launched.'));
}

const handleReadFile = (req, res) => {
  const { filename } = req.params;
  fs.readFile(`public/Map-editor/input-samples/${filename}`, 'utf-8', (err, data) => {
    if (err) throw err;
    res.send(JSON.stringify(data));
  })
};

const handleWriteFile = (req, res) => {
  const { filename, mapData } = req.body;
  const filePath = `public/Map-editor/outputs/${filename}.js`;
  fs.writeFile(filePath, mapData, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify('File creation complete.'));
    }
  })
};

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.json())
  // .set('view engine', 'ejs')   <-- do we need it? I'm guessing no

  // Endpoints:

  .get('/game', handleTest1) // Game is on a fixed page, which will request some data from the server as a test.
  .get('/time', handleTest2)
  .get('/userid', handleUserId) // First real server function here: Check if the player is signed in and send their username if so.
  .post('/post-world', handleWorldChange)
  .post('/user-login', handleLogin)
  .post('/create-user', handleNewUser)
  .get('/logout', handleLogout)
  .get('/map-editor', handleMapEditor)
  .get('/readfile/:filename', handleReadFile)
  .post('/writefile', handleWriteFile)

  // Four-oh-Four page:
  .get('*', (req, res) => {
    res.status(404);
    res.send('Oh mah Christ, how did we get here?!');
  })
  // listen on the port, and report this fact:
  .listen(PORT, () => console.log(`listening on port ${PORT}`));
