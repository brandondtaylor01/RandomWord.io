const express = require('express');
const app     = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/get-word', (req, res) => {
  return res.send({
    success: true
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