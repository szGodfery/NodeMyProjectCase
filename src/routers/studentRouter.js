//1,引入express应用框架包
const express = require('express');
const path = require('path');
//2,创建路由
const studentRouter = express.Router();
//3,引入student控制模块,处理业务逻辑
const studentCTRL = require(path.join(__dirname, '../controllers/studentControllerRouter.js'));

//3.1,处理登录过来的请求
studentRouter.get('/studentManager/list.html', studentCTRL.student);
//3.2,处理点击修改过来的请求,
studentRouter.get('/studentManager/studentEdit', studentCTRL.studentEdit);
//3.3,处理修改提交的请求
studentRouter.post('/studentManager/upDateStudentInfo', studentCTRL.studentUpdate);
//3.4,处理退出提交过来的请求
studentRouter.get('/studentManger/logout', studentCTRL.logout);
//3.5,检查是否登录请求
studentRouter.get('/studentManager/checkLogin', studentCTRL.checkLogin);






//4,导出路由对象
module.exports = studentRouter;