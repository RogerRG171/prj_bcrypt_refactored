const mysql = require('mysql2/promise');
require("dotenv").config();

const connectToMysql = async () =>{
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }

    const connection = await mysql.createConnection(config);
    console.log("Conexão realizada com sucesso!!!");
    global.connection = connection;
}

connectToMysql();

module.exports = {connectToMysql}