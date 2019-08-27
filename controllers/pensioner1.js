'use strict'

const Pensioner1 = require('../models/pensioner1');
const moment = require('moment-timezone');
moment.locale('es');

const index = (req, res) => {
    Pensioner1.find({})
        .sort({ created_at: -1, time: -1 })
        .exec((err, pensioners1) => {
            if (err) return res.status(500).send({ code: 500, meesage: "Error en el servidor" });
            if (!pensioners1) return res.status(404).send({ code: 404, meesage: "No hay registros" });
            return res.status(200).send({ code: 200, pensioners1 });
        })
}

const create = (req, res) => {
    const params = req.body;
    const pensioner1 = new Pensioner1();
    pensioner1.turno = params.turno;
    pensioner1.numeroOficio = params.numeroOficio;
    pensioner1.fechaOficio = params.fechaOficio;
    pensioner1.numeroCorrespondencia = params.numeroCorrespondencia;
    pensioner1.fechaRecepcion = params.fechaRecepcion;
    pensioner1.promovente = params.promovente;
    pensioner1.numeroJuicio = params.numeroJuicio;
    pensioner1.turnado = params.turnado;
    pensioner1.created_at = moment().format('MMMM Do YYYY');
    pensioner1.time = moment().tz("America/Mexico_City").format('HH:mm:ss a');
    pensioner1.anexo = params.anexo;
    // if (req.files) for (let f of req.files) pensioner1.anexo.push(f.filename);

    pensioner1.save((err, pensioner1Store) => {
        if (err) return res.status(500).send({ code: 500, message: "Error en la petición: " + err });
        if (!pensioner1Store) return res.status(404).send({ code: 404, message: "No se pudo registrar los datos" });
        return res.status(200).send({ code: 200, pensioner1Store });
    })
}

const show = (req, res) => {
    const { id } = req.params;
    Pensioner1.findById(id)
        .exec((err, pensioner) => {
            if (err) return res.status(500).send({ code: 500, message: 'Error en la petición' });
            if (!pensioner) return res.status(400).send({ code: 404, message: 'No se pudo borrar' });
            return res.status(200).send({ code: 200, pensioner })
        })
}

const deletePensioner1 = (req, res) => {
    const { id } = req.params;
    Pensioner1.findByIdAndDelete(id).exec((err, deleted) => {
        if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
        if (!deleted) return res.status(404).send({ code: 404, message: 'No se pudo borrar' });
        return res.status(200).send({ code: 200, message: 'Borrado' });
    })
}
const updatePensioner1 = (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Pensioner1.findByIdAndUpdate(id, update, { new: true }, (err, update) => {
        if (err) return res.status(500).send({ code: 500, message: 'Error en la peticion' });
        if (!update) return res.status(404).send({ code: 404, message: 'No se pudo actualizar' });
        return res.status(200).send({ code: 200, message: 'Actulizado correctamente', update });
    })
}


module.exports = {
    index,
    create,
    deletePensioner1,
    updatePensioner1,
    show
}
