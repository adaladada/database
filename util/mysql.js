const mysql = require("mysql2/promise");
exports.db = async(sql, arr) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345",
        database: "library"
    });
    const [data] = await connection.execute(sql, arr);
    connection.end();
    return data;
}