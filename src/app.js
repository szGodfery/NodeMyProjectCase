//1.引入express web应用框架
const express = require('express');
const path = require('path');


//2.创建app应用
const app = express();



//3.使用集成路由分发
const accountRouter = require(path.join(__dirname, '/routers/accountRouter.js'));
// console.log(accountRouter);
app.use('/account', accountRouter);



//4.开启web服务
app.listen(3000, '127.0.0.1', err => {
    if (err) throw err;
    console.log('start OK');
})