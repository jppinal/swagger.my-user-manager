'use strict';

var util = require('util');
const data = require('../mocks/users.json')

const findById = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      userId = parseInt(userId)
    } catch (err) {
      return reject(400)
    }
    var user = data.find(u => u.id === userId)
    if (!user) return reject(404)
    return resolve(user)
  })
}

const emailRule = /[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+/is;

module.exports = {
  getUsers,
  createUsers,
  getUsersById,
  updateUsersById,
  deleteUsersById
};

function getUsers(req, res) {
  return res.json(data);
}

function createUsers(req, res) {
  var user = req.swagger.params.user.value
  if (!user.name || user.name.trim() === "") return res.status(400).end();
  if (!user.email || !emailRule.test(user.email)) return res.status(400).end();
  user.id = 5
  return res.status(201).json(user).end()
}

function getUsersById(req, res) {
  var userId = req.swagger.params.userId.value
  findById(userId)
  .then(user => res.json(user))
  .catch(err => res.status(err).end())
}

function updateUsersById(req, res) {
  var userId = req.swagger.params.userId.value
  var user = req.swagger.params.user.value
  if (!user.name) return res.status(400).end()
  if (!user.email) return res.status(400).end()
  findById(userId)
  .then(() => res.json(user))
  .catch(err => res.status(err).end())
}

function deleteUsersById(req, res) {
  var userId = req.swagger.params.userId.value
  findById(userId)
  .then(user => res.status(200).end())
  .catch(err => res.status(err).end())
}
