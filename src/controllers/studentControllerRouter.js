//使用xtemplate模板进行  子页面与父页面继承 和动态数据渲染
const xtpl = require('xtpl'); //引入模板引擎第三方包
const path = require('path');
const mongodb = require('mongodb');
//创建mongo客户端
const mongoClient = mongodb.MongoClient;
//获取mongo服务器地址 url
const url = 'mongodb://Localhost:27017';
//获取需要连接的数据库名字
const dbName = 'web21';



exports.student = (req, res) => {
    //1,接收到页面请求后,链接数据库,进行数据动态渲染到页面上,在返回给浏览器
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        //1.1,创建db对象
        const db = client.db(dbName);
        //1.2,获取集合(获取表)
        const collection = db.collection('studentInfo');
        //1.3, 查询数据库
        collection.find({}).toArray(function(err, docs) {
            client.close(); //得到数据就关闭数据库
            // console.log(docs); //docs就是获取到的数据

            //1.4,把获取到的数据通过模板渲染到页面上
            //使用模板引擎读取带有模板语法的页面
            xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), { students: docs }, function(err, content) {
                //console.log(content);
                res.send(content);
            })
        })
    })



}