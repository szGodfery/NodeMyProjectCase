//使用xtemplate模板进行  子页面与父页面继承 和动态数据渲染
//const xtpl = require('xtpl'); //引入模板引擎第三方包
const path = require('path');
//导入databaseTool模块
const databaseTool = require(path.join(__dirname, '../tools/databaseTool'));

/**
 * 1,最终处理  渲染学生信息列表页面
 */
exports.student = (req, res) => {
    //1,接收到页面请求后,链接数据库,进行数据动态渲染到页面上,在返回给浏览器
    //1.0,接收模糊搜索按钮传递过来的参数
    const keyword = req.query.keyword || ''; //如果有参数就接收参数,否则就设置为空字符串
    databaseTool.findList('studentInfo', { name: { $regex: keyword } }, function(err, docs) {
        //1.4,把获取到的数据通过模板渲染到页面上
        //使用模板引擎读取带有模板语法的页面
        const loginName = req.session.LoginName; //在session中把loginname取出来
        // xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), { students: docs, keyword, loginName }, function(err, content) {
        //     //console.log(content);
        //     res.send(content);
        // })

        res.render(path.join(__dirname, '../statics/views/list.html'), {
            students: docs,
            keyword,
            loginName
        });
    })
};

/**
 * 2,最终处理  编辑学生信息页面
 */
exports.studentEdit = (req, res) => {
    //获得需要修改的学生ID
    // const id = req.query.id;
    let oldid = req.params.id; //新方法
    const id = oldid.substring(1, oldid.length - 1);
    //开启session //存取修改的学生id
    //req.session.stuId = req.query.id;
    req.session.stuId = id; //新方法
    const loginName = req.session.LoginName; //在session中把loginname取出来
    //连接数据库
    databaseTool.findOne('studentInfo', { _id: databaseTool.ObjectID(id) }, (err, doc) => {
        //使用模板引擎读取带有模板语法的页面
        // xtpl.renderFile(path.join(__dirname, '../statics/views/studentEidt.html'), { doc, loginName }, function(err, content) {
        //     //console.log(content);
        //     res.send(content);
        // })
        res.render(path.join(__dirname, '../statics/views/studentEidt.html'), {
            doc,
            loginName
        });
    })
};

/**
 * 3,最终处理  修改学生信息,成功后返回学生列表页面
 */
exports.studentUpdate = (req, res) => {
    const stuId = req.session.stuId;
    //console.log(_id);
    databaseTool.updateOne('studentInfo', { _id: databaseTool.ObjectID(stuId) }, req.body, (err, result) => {
        if (err) throw err;
        databaseTool.findList('studentInfo', {}, function(err, docs) {
            // console.log(docs);
            //在session中把loginname取出来
            const loginName = req.session.LoginName;
            //1.4,把获取到的数据通过模板渲染到页面上
            //使用模板引擎读取带有模板语法的页面
            // xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), { students: docs, loginName }, function(err, content) {
            //     //console.log(content);
            //     res.send(content);
            // })

            res.render(path.join(__dirname, '../statics/views/list.html'), {
                students: docs,
                loginName
            });
        })
    })
};

/**
 * 4,最终处理 判断是否登录  用express中的方法
 */
// exports.checkLogin = (req, res) => {
//     //console.log(req.session.LoginName);
//     const result = { status: 0, message: "未登录" }
//     if (!req.session.LoginName) {
//         res.json(result);
//     } else {
//         result.status = 1;
//         result.message = "已登录";
//         res.json(result);
//     }
// }

/**
 * 5,最终处理 处理新增页面请求
 */
exports.add = (req, res) => {
    res.render(path.join(__dirname, '../statics/views/add.html'), {
        loginName: req.session.LoginName
    });
};

/**
 * 6,最终处理 处理新增过来数据
 */
exports.addStudent = (req, res) => {
    //console.log(req.body);
    databaseTool.insertOne('studentInfo', req.body, (err, result) => {
        //console.log(result);
        if (err) throw err;
        res.send(`<script>alert("新增成功");location.href="/student/studentManager/list.html";</script>`);
    })
};
/**
 * 7,最终处理 处理删除过来数据
 */

exports.deleteStudent = (req, res) => {
    const studentID = req.params.studentId;
    const id = studentID.substring(1, studentID.length - 1);
    databaseTool.deleteOne('studentInfo', { _id: databaseTool.ObjectID(id) }, (err, result) => {
        if (err) throw err;
        res.send(`<script>alert("删除成功");location.href="/student/studentManager/list.html";</script>`)
    })
};