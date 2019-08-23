'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 5000;
const DB = 'mongodb://localhost:27017/issste';


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
