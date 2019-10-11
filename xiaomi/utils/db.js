var mysql = require('mysql')

module.exports = {
    config: {
        host: '94.191.87.109',
        port: 3306,
        user: 'root',
        password: 'hs6j58q',
        database: 'level3_1',
        dateStrings:true
    },
    dbConnect:function (sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config)
        pool.getConnection(function (err, connect) {
            if (err) {
                console.log(err);
                return err;
            }
            connect.query(sql, sqlArr, callBack)
            connect.release()
        })
    }
}