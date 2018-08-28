//1,引入express应用框架包
const express = require('express');
const path = require('path');
//2,创建路由
const studentRouter = express.Router();
//3,引入student控制模块,处理业务逻辑
const studentCTRL = require(path.join(__dirname, '../controllers/studentControllerRouter.js'));

//3.1,处理登录过来的请求
studentRouter.get('/studentManager', studentCTRL.student);





//4,导出路由对象
module.exports = studentRouter;