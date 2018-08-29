//1,引入路径
const path = require('path');
const captchapng = require('captchapng'); //图片验证码第三方包
const databaseTool = require(path.join(__dirname, '../tools/databaseTool')); //导入databaseTool模块

//2,导出模块

/**
 * 3.0最终处理,返回登录页面给浏览器
 */
module.exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
};
/**
 * 3.0.1最终处理,处理图片验证码返回浏览器 
 */
exports.getVcode = (req, res) => {
    const vCode = parseInt(Math.random() * 9000 + 1000);
    //为了与登录输入的图片码进行验证,需要在服务器开启sesson,在app.js引入第三方包express-session
    req.session.vCode = vCode; //设置session
    //console.log(req.session.vCode);//取值session

    const p = new captchapng(80, 30, vCode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(201, 48, 44, 255); // Second color: paint (red, green, blue, alpha)

    const img = p.getBase64();
    const imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
};
/**
 * 3.0.2最终处理,处理登录提交过来的数据验证
 */
exports.Login = (req, res) => {
    //console.log(req.body);
    const result = { status: 0, message: '登录成功' };
    //判断验证码是否正取
    if (req.session.vCode != req.body.vCode) {
        result.status = 1;
        result.message = '验证失败';
        res.json(result);
        return;
    }
    //在把用户名和密码在   数据库查询
    databaseTool.findOne('userInfo', { username: req.body.username, password: req.body.password }, (err, doc) => {
        if (doc == null) { //如果没有值,表示不存在,要返回给浏览器信息
            result.status = 2;
            result.message = "用户名或密码错误";
            res.json(result);
        } else {
            res.json(result);
        }
    })
};

/**
 * 3.2最终处理,返回注册页面给浏览器
 */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
};

/**
 * 3.3最终处理,处理用户提交过来的注册信息
 */
exports.registerInfo = (req, res) => {
    //console.log(req.body.username);
    const result = { status: 0, message: '注册成功' };
    //1,判断提交过来的注册信息用户名在数据库中是否存在,
    //链接数据库
    databaseTool.findOne('userInfo', { username: req.body.username }, (err, doc) => {
        if (doc) { //如果有值,表示存在,要返回给浏览器信息
            result.status = 1;
            result.message = "用户名已存在";
            res.json(result);
        } else {
            //把数据插入到数据库
            databaseTool.insertOne('userInfo', req.body, (err, result2) => {
                if (result2 == null) { //如果为空就提示注册失败,
                    result.status = 2;
                    result.message = "注册失败"
                }
                res.json(result)
            })
        }
    })
};