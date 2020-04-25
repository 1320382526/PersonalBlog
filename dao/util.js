var mysql = require('mysql')

function createConnection() {
    //链接mysql数据库配置
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'grbk'
    });

    return connection;
}

module.exports.createConnection = createConnection;