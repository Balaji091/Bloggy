const express = require('express');
const { signup, login, logout ,checkAuth} = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.verify');

const AuthRouter = express.Router();

AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
AuthRouter.get('/checkAuth',verifyToken,checkAuth);

module.exports = AuthRouter;
