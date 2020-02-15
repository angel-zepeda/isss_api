'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pensioner2 = Schema({
  pensioner1: { type: Schema.Types.ObjectId, ref: 'Pensioner1' },
  numero_pension: String,
  sala: String,
  tipo_expediente: String,
  numero_expediente: String,
  observaciones: String,
  letra: String,
  termino_sentencia: String,
  envio_juridico: String,
  monto_cheque: String,
  ajuste_cuota: String,
  mes_instalacion: String,
  estatus_expediente: String,
  clasificacion: String,
  created_at: String,
  time: String,
  anexo: [String],
});

module.exports = mongoose.model('Pensioner2', Pensioner2);
