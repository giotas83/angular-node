const express = require('express');
// npm install --save nodemon   server riavvio automatico  -> nodemon server.js
// npm install --save body-parser     ->> converte il body in una reuest in obj
const bodyParser = require('body-parser');


// DATABASE ********

const mongoose = require('mongoose');
const Post = require('./models/post'); // schema creato per mongodb

// connessione mongodb locale
mongoose.connect('mongodb://localhost/testAngularNode').then(
  ()=> console.log('connessione con mongodb effettuata')
).catch( ()=> console.log('connessione con mongodb rifiutata') );


// MIDDLEWARES *****************************

const app = express();

app.use(bodyParser.json());  // middleware for parse body request from json data in object
app.use(bodyParser.urlencoded({extended: false})) // middleware for parse body request from url encode data to obj

app.use( (req, res, next) => {
  console.log('first Middleware -> next'); // middleware esempio che manda soltanto avanti
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


app.post('/api/posts', (req, res, next) => {
  // console.log('chiamata post stampo la request: ', req);
  // const post = req.body; // from bodyPArser
  const post = new Post({title: req.body.title, content: req.body.content}); // creato con schema mongoose
  post.save(); // salvataggio in db
  // per evitare un timeout devo cmq mandare una response
  res.status(201).json({message: 'post created successfully'})  // 201 tutto ok una nuova risorsa è stata creata
}) // senza il next si ferma qui e non va avanti, non mi serve andare avanti

app.get('/api/posts', (req, res, next) => { // se mi collego con questo path manda questa response
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

// arriva qui se atterro senza il path non definito prima localhost:3000 e senza nessuna get/post
app.use((req, res, next)=> {
  console.log('ultimo Middleware -> send');
  res.send('ciao sono il first server express');
})

module.exports = app;
