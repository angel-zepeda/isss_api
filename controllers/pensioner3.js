'use strict';
const Pensioner3 = require('../models/pensioner3');
const moment = require('moment-timezone');

const index = (req, res) => {
  Pensioner3.find()
    .populate('pensioner1')
    .exec((err, pensioner3) => {
      if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
      if (!pensioner3) return res.status(404).send({ code: 404, message: 'No hay registros' });
      return res.status(200).send({ code: 200, pensioner3 });
    });
}
const create = (req, res) => {
  const params = req.body;
  const pensioner3 = new Pensioner3();
  pensioner3.pensioner2 = params.pensioner2_id;
  pensioner3.que_se_liquida = params.que_se_liquida
  pensioner3.fecha_liquidacion = params.fecha_liquidacion
  pensioner3.autoridad_cumplimiento = params.autoridad_cumplimiento
  pensioner3.materia = params.materia
  pensioner3.numero_uj = params.numero_uj
  pensioner3.fecha_uj = params.fecha_uj
  pensioner3.numero_sp = params.numero_sp
  pensioner3.fecha_sp = params.fecha_sp
  pensioner3.fecha_sentencia = params.fecha_sentencia
  pensioner3.integrador = params.integrador
  pensioner3.liquidador = params.liquidador
  pensioner3.estatus_final = params.estatus_final
  pensioner3.created_at = moment().format('MMMM Do YYYY');
  pensioner3.time = moment().tz("America/Mexico_City").format('HH:mm:ss a');

  if (req.files) for (let f of req.files) pensioner3.anexo.push(f.filename);

  pensioner3.save((err, pensioner3Store) => {
    if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
    if (!pensioner3Store) return res.status(404).send({ code: 404, message: 'No se pudo guardar' });
    return res.status(202).send({ code: 202, pensioner3Store });
  })
}

const deletePensioner3 = (req, res) => {
  const { id } = req.params;
  Pensioner3.findByIdAndDelete(id).exec((err, deleted) => {
    if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
    if (!deleted) return res.status(404).send({ code: 404, message: 'No se pudo borrar' });
    return res.status(200).send({ code: 200, message: 'Borrado' });
  })
}
const updatePensioner3 = (req, res) => {
  const { id } = req.params;
  const update = req.body;
  Pensioner3.findByIdAndUpdate(id, update, (err, update) => {
    if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
    if (!update) return res.status(404).send({ code: 404, message: 'No se pudo actualizar' });
    return res.status(200).send({ code: 200, message: 'Actulizado correctamente', update });
  })
}

module.exports = {
  index,
  create,
  deletePensioner3,
  updatePensioner3
}