'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function index(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (users) return res.status(200).send(users);
  }).sort('_id')
}

function create(req, res) {
  const params = req.body;
  var user = new User();
  user.name = params.name;
  user.email = params.email;
  user.role = params.role;
  //user.surname = params.surname;
  //user.nick = params.nick;
  //user.image = null;
  User.find({ email: user.email.toLowerCase() })
    .exec((err, users) => {
      if (err) return res.status(500).send({ message: "Error en la peticion de usuario" })
      if (users && users.length >= 1) {
        return res.status(200).send({
          message: "Existe un usario registrado con el mismo email"
        })
      } else {
        bcrypt.hash(params.password, null, null, (err, hash) => {
          user.password = hash;
          user.save((err, userStore) => {
            if (err) return res.status(500).send({ message: "Error al guardar el usuario" })
            if (!userStore) return res.status(404).send({ message: "No se ha registrado el usuario" })
            return res.status(200).send({ user: userStore });
          })
        });
      }
    });
}

function loginUser(req, res) {
  const { email, password, getToken } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) res.status(500).send({ message: "Error en la petición" });
    if (user) {
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {
          if (getToken) {
            user.password = undefined;
            return res.status(200).send({ code: 200, user: user, token: jwt.createToken(user) });
          } else {
            user.password = undefined;
            return res.status(200).send({ code: 200, user });
          }
        } else {
          res.send({ code: 404, message: "La contraseña es incorrecta" })
        }
      });
    } else {
      res.send({ code: 404, message: "No se encontró usuario registrado" })
    }
  });
}

function getUser(req, res) {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (!user) return res.status(404).send({ message: "El usuario no existe" });
    return res.status(200).send({ user });
  });
}

function update(req, res) {
  const userId = req.params.id;
  const update = req.body;
  delete update.password;
  if (userId != req.user.sub) return res.statu(500).send({ message: "No tienes permiso para acutalizar los datos del usuario" });
  User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
    if (err) return res.statu(500).send({ message: "Error en la peticion" });
    if (!userUpdated) return res.status(404).send({ message: "No se ha podido actualizar el usuario" })
    return res.status(200).send({ user: userUpdated });
  });
}

module.exports = {
  index,
  create,
  loginUser,
  getUser,
  update
}
