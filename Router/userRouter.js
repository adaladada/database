const express = require('express');
const userRouter = express.Router();

// 导入 login
const login = require('../Controller/login');

// 登录
userRouter.post('/login', login.handleLogin)
userRouter.post('/show', login.handleBookShow)
userRouter.post('/borrow', login.handleBookBorrow)
userRouter.post('/return', login.handleBookReturn)
userRouter.post('/showReturn', login.handleBookReturnShow)

module.exports = userRouter;
