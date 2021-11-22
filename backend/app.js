const express = require('express');

const app = express();

app.use( (req, res, next) => {
  console.log('first Middleware -> next');
  next(); // va avanti
});

// middleware for Cors
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
  console.log('cors Middleware -> next');
  next(); // va avanti
});

app.use('/api/posts', (req, res, next) => { // se mi collego con questo path manda questa response
  const posts = [
    {
      id: '234kb234',
      title: 'First server-side post',
      content: 'content from server'
    },
    {
      id: '2444geg74',
      title: 'Secondserver-side post',
      content: 'content from server, second post'
    }
  ]
  res.status(200).json({
    message: 'Post fetched succesfully',
    posts: posts
  }); // se mi collego con il path localhost:3000/api/posts manda la response e si ferma
});

// arriva qui se atterro senza il path non definito prima localhost:3000
app.use((req, res, next)=> {
  console.log('second Middleware -> send');
  res.send('ciao sono il first server express');
})

module.exports = app;
