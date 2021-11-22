const express = require('express');

const app = express();

app.use( (req, res, next) => {
  console.log('first Middleware -> next');
  next();
});

app.use((req, res, next)=> {
  console.log('second Middleware -> send');
  res.send('ciao sono il first server express');
})

module.exports = app;
