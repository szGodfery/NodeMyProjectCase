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
app.use(session({
    secret: 'keyboard cat',
    resave: false, //添加这行  是否每次都重新保存会话，建议false
    saveUninitialized: false, //添加这行 是否自动保存未初始化的会话，建议false
    cookie: { maxAge: 30 * 60000 } //有效期，单位是毫秒
}));
//art模板引擎
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
//登录判断拦截
app.all('/*', (req, res, next) => {
    if (req.url.includes('account')) { //所有请求都会进入这里
        next() //放行,next方法属于express中间件,调用它就是把控制权交给下一个组件
    } else {
        //判断是否有session,如果有,就放行
        if (req.session.LoginName) {
            next();

        } else {
            res.send(`<script>alert("账号未登录,请重新登录");location.href="/account/login.html"</script>`)
        }
    }

});




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