require('dotenv').config(); // import the configuration file.
const process = require('process');
const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const https   = require('https');
const session = require('cookie-session');
const app     = express();

// middleware

// we accept connections from anywhere.
app.use(cors({
  origin: '*'
}));

// prevent cookie theft.
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    secure: true
  })
);

// ensure that the request bodies are nice and formatted.
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

  let ssl = (process.env.SSL.toLowerCase() === 'true' || process.env.SSL === true);

  // if SSL is enabled.
  if(ssl) {
  
    var options = {
      key: fs.readFileSync(process.env.PRIVKEY),
      cert: fs.readFileSync(process.env.FULLCHAIN),
    };
    
    // setup the HTTPS server.
    https.createServer(options, app).listen(process.env.PORT, () =>{
      console.log('Secure server started on port', process.env.PORT);
    });

    return;
  }

  // start the insure server.
  app.listen(process.env.PORT, () => {
    console.log('Insecure server started on port', process.env.PORT);
  });
});
