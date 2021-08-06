require('dotenv').config()

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');

//retrieve all users

router.get('/', userController.findAll);

router.get('/getAllUsers', userController.findAll);

//create new user

router.post('/', userController.create);

//retrieve a single user with id

// router.get('/:id', userController.findOne);

//retrieve a single user 

router.get('/getData', authenticateToken, userController.findOneByUsername);

//retrieve a single user 

router.get('/getUserByNumber', authenticateToken, userController.findUserByNumber);

//update user

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

router.post('/login/', userController.login);


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = router