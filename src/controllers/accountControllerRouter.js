//1,引入路径
const path = require('path');

//2,导出模块

/**
 * 最终处理,返回登录页面给浏览器
 */
module.exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'));
};

/**
 * 最终处理,返回注册页面给浏览器
 * */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'));
}