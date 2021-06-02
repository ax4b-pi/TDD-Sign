const mysql = require('mysql2/promise');
async function connect(mysql){
    
    const connection = await mysql.createConnection({
        host     : 'localhost',
        database : 'sign',
        user     : 'root',
        password : 'Pass@word1'
    });
    console.log("Conectado");
    return connection;
}

async function consultar(mysql)
{
    console.log("consultar");
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT * FROM contacts WHERE ContactId LIKE "ce95141c-47b2-4f23-a8cd-7a610225b371";');
    console.log(rows);
    if (rows.length > 0)
    {
        return true;
    }else
        return false;
}
var result = consultar(mysql);  



    
    
    