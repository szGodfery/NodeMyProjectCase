//使用xtemplate模板进行  子页面与父页面继承 和动态数据渲染
const xtpl = require('xtpl'); //引入模板引擎第三方包
const path = require('path');
//导入databaseTool模块
const databaseTool = require(path.join(__dirname, '../tools/databaseTool'));

//导出给路由调用
exports.student = (req, res) => {
    //1,接收到页面请求后,链接数据库,进行数据动态渲染到页面上,在返回给浏览器
    //1.0,接收模糊搜索按钮传递过来的参数
    const keyword = req.query.keyword || ''; //如果有参数就接收参数,否则就设置为空字符串
    //console.log(keyword);
    databaseTool.findList('studentInfo', { name: { $regex: keyword } }, function(err, docs) {
        //1.4,把获取到的数据通过模板渲染到页面上
        //使用模板引擎读取带有模板语法的页面
        xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), { students: docs, keyword }, function(err, content) {
            //console.log(content);
            res.send(content);
        })
    })
}