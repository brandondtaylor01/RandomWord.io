const express = require('express');
const cors    = require('cors');
const app     = express();

// middleware
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/**
 * It returns a random word from an array of words.
 * @returns A random word.
 */
function randomWord() {

  // pretend to get a random word.
  let words = [
    'test',
    'cats',
    'planet',
    'wife',
    'computer',
    'work',
    'crunchy',
    'company',
    'desk',
    'soda',
    'dog',
    'mom',
    'dad',
    'brother',
    'sister',
    'car',
    'truck',
    'trash',
    'bike',
    'motorcycle'
  ];
  let word = words[Math.floor(Math.random() * words.length)];
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

// run server.
app.listen(7777, () => {
  console.log('Server started.');
});