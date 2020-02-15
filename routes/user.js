'use strict';

const express = require('express');
const api = express.Router();
const userController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

// RUTAS DE LOGIN
api.get('/users', userController.index);
api.post('/register', userController.create);
api.post('/login', userController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, userController.getUser);
api.put('/user/update/:id', md_auth.ensureAuth, userController.update);

module.exports = api;
