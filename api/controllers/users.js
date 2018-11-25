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

module.exports = {
  getusers,
  createUsers,
  getusersById,
  updateUsersById,
  deleteUsersById
};

function getusers(req, res) {
  return res.json(data);
}

function createUsers(req, res) {
  var user = req.swagger.params.user.value
  if (!user.name) return res.status(405).end()
  if (!user.email) return res.status(405).end()
  user.id = 5
  return res.status(201).json(user).end()
}

function getusersById(req, res) {
  var userId = req.swagger.params.userId.value
  findById(userId)
  .then(user => res.json(user))
  .catch(err => res.status(err).end())
}

function updateUsersById(req, res) {
  var userId = req.swagger.params.userId.value
  findById(userId)
  .then(user => res.json(user))
  .catch(err => res.status(err).end())
}

function deleteUsersById(req, res) {
  var userId = req.swagger.params.userId.value
  findById(userId)
  .then(user => res.status(200).end())
  .catch(err => res.status(err).end())
}
