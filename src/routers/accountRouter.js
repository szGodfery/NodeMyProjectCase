//1,引入express 应用框架
const express = require('express');
const path = require('path');


//引入account控制模块处理逻辑
const accountCTRL = require(path.join(__dirname, '../controllers/accountControllerRouter'));

//2,创建路由对象
const accountRouter = express.Router();



//3,处理传递过来的请求,并分发给控制模块处理
//3.0处理登录页面请求
accountRouter.get('/login.html', accountCTRL.getLoginPage);
//3.0.1处理验证码请求,是由图片的src属性发起的get请求
accountRouter.get('/vcode', accountCTRL.getVcode);
//3.0.2处理登录数据验证请求
accountRouter.post('/login', accountCTRL.Login);


//3.2处理注册页面请求
accountRouter.get('/register.html', accountCTRL.getRegisterPage);

//3.3处理注册请求
accountRouter.post('/register', accountCTRL.registerInfo);

//3.4,处理退出提交过来的请求
accountRouter.get('/logout', accountCTRL.logout);







//4,导出路由对象
module.exports = accountRouter;