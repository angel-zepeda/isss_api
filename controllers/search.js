const Pensioner1 = require('../models/pensioner1');
const Pensioner2 = require('../models/pensioner2');

const search = (req, res) => {
  var { key } = req.body;
  Pensioner1.find({
    $or: [
      { promovente: new RegExp(key, 'i') },
      { numeroJuicio: new RegExp(key, 'i') },
      {
        turno: Number.isInteger(key)
          ? key
          : Number.isNaN(parseInt(key))
          ? 0
          : parseInt(key),
      },
      { numeroOficio: new RegExp(key, 'i') },
    ],
  }).exec((err, find) => {
    if (err)
      return res
        .status(500)
        .send({ code: 500, message: 'Error en la petición', err });
    if (!find)
      return res
        .status(404)
        .send({ code: 404, message: 'No se encontraron coincidencias' });
    return res.status(200).send({ code: 200, find });
  });
};

const search2 = (req, res) => {
  var { key } = req.body;

  Pensioner2.find({})
    .select('_id')
    .populate({
      path: 'pensioner1',
      match: { promovente: new RegExp(key, 'i') },
      select: 'turno',
    })
    .exec((err, find) => {
      if (err)
        return res
          .status(500)
          .send({ code: 500, message: 'Error en la petición', err });
      if (!find)
        return res
          .status(404)
          .send({ code: 404, message: 'No se encontraron coincidencias' });
      return res.status(200).send({ code: 200, find });
    });
};

module.exports = {
  search,
  search2,
};
