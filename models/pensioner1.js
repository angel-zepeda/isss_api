const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pensioner1 = Schema({
  turno: Number,
  numeroOficio: String,
  fechaOficio: String,
  numeroCorrespondencia: String,
  fechaRecepcion: String,
  promovente: String,
  numeroJuicio: String,
  turnado: String,
  created_at: String,
  time: String,
  complement: {
    type: Boolean,
    default: false,
  },
  anexo: [String],
});

module.exports = mongoose.model('Pensioner1', Pensioner1);
