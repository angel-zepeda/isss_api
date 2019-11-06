'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const user_routes = require('./routes/user');
const secretaria_routes = require('./routes/pensioner1');
const integrador_routes = require('./routes/pensioner2');
const search_routes = require('./routes/search');

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '40mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(express.static('files'));
app.use('/api/v1', [user_routes, secretaria_routes, integrador_routes, search_routes]);

module.exports = app;