//1,导入mongodb第三方包
const mongodb = require('mongodb');
//2,创建mongo客户端
const mongoClient = mongodb.MongoClient;
//3,获取mongo服务器地址 url
const url = 'mongodb://Localhost:27017';
//4,获取需要连接的数据库名字
const dbName = 'web21';

//封装连接数据库方法
/**
 * 
 * @param {*} collectionName  集合名
 * @param {*} callback  连接成功之后的回调函数 三个参数,1,链接失败的错误信息;2,集合;3,关闭连接的client
 */
function linkdb(collectionName, callback) {
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName); //创建db对象
        const collection = db.collection(collectionName); //获取数据集合
        callback(err, collection, client);
    })
};




//5,导出查询多条方法(对象)
exports.findList = (collectionName, parames, callback) => {
    //5.1调用数据库连接方法 返回callback(err, collection, client)
    linkdb(collectionName, (err, collection, client) => {
        //5.2查询多条
        collection.find(parames).toArray(function(err, docs) {
            client.close(); //关闭数据库链接
            callback(err, docs); //返回结果给回调函数
        })
    });
};
//6,导出查询一条方法(对象)
exports.findOne = (collectionName, parames, callback) => {
    //6.1链接数据库
    linkdb(collectionName, (err, collection, client) => {
        //6.2查询一条
        collection.findOne(parames, (err, doc) => {
            client.close();
            callback(err, doc);
        })
    })
}




//7,导出增加方法insert(对象)
exports.insertOne = (collectionName, parames, callback) => {
    //7.1链接数据库
    linkdb(collectionName, (err, collection, client) => {
        //6.2增加一条
        collection.insertOne(parames, (err, result) => {
            client.close();
            callback(err, result);
        })
    })
};