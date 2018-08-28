//1,引入路径
const path = require('path');
const mongodb = require('mongodb'); //导入第三方mongodb包
//创建mongodb客户端
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://Localhost:27017';
const dbName = 'web21';



//2,导出模块

/**
 * 最终处理,返回登录页面给浏览器
 */
module.exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
};

/**
 * 最终处理,返回注册页面给浏览器
 */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
};

/**
 * 最终处理,处理用户提交过来的注册信息
 */
exports.registerInfo = (req, res) => {
    console.log(req.body.username);
    const result = { status: 0, message: '注册成功' };
    //1,判断提交过来的注册信息用户名在数据库中是否存在,
    //链接数据库
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        //创建db对象
        const db = client.db(dbName);
        //获取数据集合
        const collection = db.collection('userInfo');
        //查询用户名是否存在
        collection.findOne({ username: req.body.username }, (err, doc) => {
            console.log(doc);
            if (doc) { //如果有值,表示存在,要返回给浏览器信息
                client.close(); //关闭数据库连接
                result.status = 1;
                result.message = "用户名已存在";
                res.json(result);
            } else {
                //把数据插入到数据库
                collection.insertOne(req.body, (err, result2) => {
                    if (result2 == null) { //如果为空就提示注册失败,
                        client.close(); //关闭数据库连接
                        result.status = 2;
                        result.message = "注册失败"
                    }
                    res.json(result)
                })
            }
        })
    })
}