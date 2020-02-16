'use strict';
const fs = require('fs');
const mongoXlsx = require('mongo-xlsx');
const Pensioner2 = require('../models/pensioner2');
const xlsx = require('node-xlsx').default;

const deleteFiles = (req, res) => {
  const { name } = req.params;
  fs.unlinkSync('/root/Issste/isssteCGapi/files/' + name);
};

const generateDataForXlsx = (req, res) => {
  var data = [
    {
      code: 200,
      pensioner2: [
        {
          anexo: [],
          _id: '5db252c85cf1b20d847977a0',
          pensioner1: {
            complement: true,
            anexo: [],
            _id: '5db252465cf1b20d8479779f',
            turno: 1,
            numeroOficio: '1',
            fechaOficio: '2019-10-05',
            numeroCorrespondencia: '1',
            fechaRecepcion: '2019-10-02',
            promovente: '1',
            numeroJuicio: '1',
            turnado: '1',
            created_at: 'octubre 24º 2019',
            time: '20:39:18 pm',
            __v: 0,
          },
          numero_pension: '2',
          sala: '2',
          tipo_expediente: '2',
          numero_expediente: '2',
          observaciones: '2',
          letra: '2',
          termino_sentencia: '2019-10-03',
          envio_juridico: '2019-10-02',
          monto_cheque: '2',
          ajuste_cuota: '2',
          mes_instalacion: '2',
          estatus_expediente: 'Integración',
          clasificacion: 'Nulidad',
          created_at: 'octubre 24º 2019',
          time: '20:41:28 pm',
          __v: 0,
        },
      ],
    },
  ];
  var model = mongoXlsx.buildDynamicModel(data);

  Pensioner2.find()
    .populate('pensioner1')
    .exec((err, pensioner2) => {
      if (err) return res.status(500).send({ code: 500, message: err });
      if (!pensioner2) {
        return res.status(404).send({ code: 404, message: 'Not found' });
      }

      const dataSheet1 = [
        [1, 2, 3],
        [true, false, null, 'sheetjs'],
        ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
        ['baz', null, 'qux'],
      ];
      const dataSheet2 = [
        [4, 5, 6],
        [7, 8, 9, 10],
        [11, 12, 13, 14],
        ['baz', null, 'qux'],
      ];
      const range = { s: { c: 0, r: 0 }, e: { c: 0, r: 3 } }; // A1:A4
      const sheetOptions = { '!merges': [range] };

      var buffer = xlsx.build([
        { name: 'myFirstSheet', data: dataSheet1 },
        { name: 'mySecondSheet', data: dataSheet2, options: sheetOptions },
      ]);
      return buffer;
    });
};

module.exports = {
  deleteFiles,
  generateDataForXlsx,
};
