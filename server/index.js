require('dotenv').config(); // import the configuration file.
const process = require('process');
const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const http    = require('http');
const https   = require('https');
const app     = express();

// middleware
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set the dictionary field.
let dictionary = [];

function loadDictionary() {
  return new Promise((resolve, reject) => {
    // load the dictionary into memory.
    fs.readFile('./dictionary.json', 'utf-8', (err, data) => {
      if(err) {
        return reject(err);
      }
      return resolve(JSON.parse(data));
    });
  });
}

/**
 * It returns a random word from an array of words.
 * @returns A random word.
 */
function randomWord() {
  let word = dictionary[Math.floor(Math.random() * dictionary.length)];
  return word;
}

app.get('/get-word', (req, res) => {
  let word = randomWord();
  return res.send({
    success: true,
    word: word
  });
});

// catch-all.
app.get('/', (req, res) => {
  return res.send({
    success: false,
    error: 404
  });
});

// load the dictionary.
loadDictionary().then((data) => {
  dictionary = data;

  console.log('Dictionary loaded.')

  // if SSL is enabled.
  if(Boolean(process.env.SSL)) {
    return https.createServer(app).listen(Number(process.env.PORT) || 8443, () => {
      console.log('Secure server started on port', Number(process.env.PORT) || 8443);
    });
  }

  // SSL is not enabled, start insecure server.
  return http.createServer(app).listen(Number(process.env.PORT) || 8080, () => {
    console.log('Insecure started on port', Number(process.env.PORT) || 8080);
  })
});