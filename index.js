'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 5000;
// const DB = 'mongodb://localhost:27017/issste';
const DB = 'mongodb://issste-node-api:rodneymullen1@ds147723.mlab.com:47723/heroku_bgzgpl5r'
const HOST = '189.142.104.2';

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(DB, { useNewUrlParser: true })
  .then(() => {
    console.log("Se conectó exitosamente");
    app.listen(PORT, () => {
      console.log("Servidor corriendo en puerto: " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
