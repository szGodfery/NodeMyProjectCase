//1.引入express web应用框架
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


//2.创建app应用
const app = express();
// parse application/x-www-form-urlencoded   处理post请求,解析成对象
app.use(bodyParser.urlencoded({ extended: false }))

// Use the session middleware  服务器开启session
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 } }));


//3.使用集成路由分发
//3.1处理一级目录是account的请求,并分发给二级路由
const accountRouter = require(path.join(__dirname, '/routers/accountRouter.js')); //导入二级路由
// console.log(accountRouter);
app.use('/account', accountRouter);


//3.2处理一级目录是student的请求,并分发给二级路由
const studentRouter = require(path.join(__dirname, '/routers/studentRouter.js')); //导入二级路由
app.use('/student', studentRouter);





//4.开启web服务
app.listen(3000, '127.0.0.1', err => {
    if (err) throw err;
    console.log('start OK');
})