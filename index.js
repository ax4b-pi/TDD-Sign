const mysql = require('mysql2/promise');
async function connect(mysql){
    
    // const connection = await mysql.createConnection({
    //     host     : 'localhost',
    //     database : 'sign',
    //     user     : 'root',
    //     password : 'Pass@word1'
    // });
    const connection = await mysql.createConnection({
        host     : 'focvs-v2-database-dev.cpfgjde77l7d.us-east-1.rds.amazonaws.com',
        database : 'focvs',
        user     : 'admin',
        password : 'focvs-v2-dev'
    });
    console.log("Conectado");
    return connection;
}
async function consultar(mysql,contactId)
{
    console.log("consultar");
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT * FROM Contacts');
    console.log(rows);
    if (rows.length > 0)
    {
        return true;
    }else
        return false;
}
var result = consultar(mysql, "ce95141c-47b2-4f23-a8cd-7a610225b371");  



    
    
    