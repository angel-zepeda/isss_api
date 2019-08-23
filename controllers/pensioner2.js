'use strict';
const Pensioner2 = require('../models/pensioner2');
const moment = require('moment-timezone');

const index = (req, res) => {
  Pensioner2.find()
    .populate('pensioner1')
    .exec((err, pensioner2) => {
      if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
      if (!pensioner2) return res.status(404).send({ code: 404, message: 'No hay registros' });
      return res.status(200).send({ code: 200, pensioner2 });
    });
}
const create = (req, res) => {
  const params = req.body;
  const pensioner2 = new Pensioner2();

  pensioner2.pensioner1 = params.pensioner1_id;
  pensioner2.numero_pension = params.numero_pension
  pensioner2.sala = params.sala
  pensioner2.tipo_expediente = params.tipo_expediente
  pensioner2.numero_expediente = params.numero_expediente
  pensioner2.observaciones = params.observaciones
  pensioner2.letra = params.letra
  pensioner2.termino_sentencia = params.termino_sentencia
  pensioner2.envio_juridico = params.envio_juridico
  pensioner2.monto_cheque = params.monto_cheque
  pensioner2.ajuste_cuota = params.ajuste_cuota
  pensioner2.mes_instalacion = params.mes_instalacion
  pensioner2.estatus_expediente = params.estatus_expediente
  pensioner2.clasificacion = params.clasificacion
  pensioner2.created_at = moment().format('MMMM Do YYYY');
  pensioner2.time = moment().tz("America/Mexico_City").format('HH:mm:ss a');

  if (req.files) for (let f of req.files) pensioner2.anexo.push(f.filename);

  pensioner2.save((err, pensioner2Store) => {
    if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
    if (!pensioner2Store) return res.status(404).send({ code: 404, message: 'No se pudo guardar' });
    return res.status(200).send({ code: 200, pensioner2Store });
  })
}

const deletePensioner2 = (req, res) => {
  const { id } = req.params;
  Pensioner2.findByIdAndDelete(id).exec((err, deleted) => {
    if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
    if (!deleted) return res.status(404).send({ code: 404, message: 'No se pudo borrar' });
    return res.status(200).send({ code: 200, message: 'Borrado' });
  })
}
const updatePensioner2 = (req, res) => {
  const { id } = req.params;
  const update = req.body;
  Pensioner2.findByIdAndUpdate(id, update, (err, update) => {
    if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
    if (!update) return res.status(404).send({ code: 404, message: 'No se pudo actualizar' });
    return res.status(200).send({ code: 200, message: 'Actulizado correctamente', update });
  })
}

const show = (req, res) => {
  const { id } = req.params;
  Pensioner2.find({ pensioner1: id })
    .populate('pensioner1')
    .exec((err, pensioner2) => {
      if (err) return res.status(500).send({ code: 500, message: err });
      if (!pensioner2) res.status(404).send({ code: 404, message: 'Not found' });
      return res.status(200).send({ code: 200, pensioner2 });
    })
}

module.exports = {
  index,
  create,
  deletePensioner2,
  updatePensioner2,
  show
}