//1,引入express 应用框架
const express = require('express');
const path = require('path');

//引入account控制模块处理逻辑
const accountCTRL = require(path.join(__dirname, '../controllers/accountControllerRouter'));

//2,创建路由对象
const accountRouter = express.Router();

//3,处理传递过来的请求
//3.1处理登录页面请求
accountRouter.get('/login.html', accountCTRL.getLoginPage);
//3.2处理注册请求
accountRouter.get('/register.html', accountCTRL.getRegisterPage);



//4,导出路由对象
module.exports = accountRouter;