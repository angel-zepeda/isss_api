'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pensioner3 = Schema({
  pensioner2: { type: Schema.Types.ObjectId, ref: 'Pensioner2' },
  que_se_liquida: String,
  fecha_liquidacion: Date,
  autoridad_cumplimiento: String,
  materia: String,
  numero_uj: String,
  fecha_uj: String,
  numero_sp: String,
  fecha_sp: Date,
  fecha_sentencia: Date,
  integrador: String,
  liquidador: String,
  estatus_final: String,
  created_at: String,
  time: String,
  anexo: [String]
});


module.exports = mongoose.model('Pensioner3', Pensioner3);