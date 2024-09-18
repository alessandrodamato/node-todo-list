const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./data/db');

const todoRoutes = require('./routes/todo');

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(express.static('public'));

app.use('/todo', todoRoutes);

sequelize.authenticate()
.then(res => {
  console.log('Connessione al DB eseguita con successo');
  // sequelize.sync({force: true})
  sequelize.sync()
  .then(r => {
    console.log('Sincronizzazione eseguita con successo');
    app.listen('8080');
  })
  .catch(err => {
    console.log('Sincronizzazione fallita: ' + err);

  })
})
.catch(err => {
  console.log('Connessione al DB fallita: ' + err);
})