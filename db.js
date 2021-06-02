
async function connect(mysql){
    
    const connection = await mysql.createConnection({
        host     : 'localhost',
        database : 'sign',
        user     : 'root',
        password : 'Pass@word1'
    });
    return connection;
}
//CLIENTE
async function consultarClienteById(mysql, idCliente)
{
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT * FROM contacts WHERE ContactId LIKE "' + idCliente + '"');
    conn.end();
    return rows[0].name;
}
async function inserirCliente(mysql, query)
{
    const conn = await connect(mysql);
    await conn.query(query);
    conn.end();
}
async function consultarCliente(mysql, idCliente)
{
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT * FROM contacts WHERE ContactId LIKE "' + idCliente + '"');
    conn.end();
    
    if (rows.length > 0)
        return true;
    else
        return false;
}
async function deletarCliente(mysql, idCliente)
{
    const conn = await connect(mysql);
    await conn.query('DELETE FROM contacts WHERE ContactId LIKE "'+ idCliente +'";');
    conn.end();
}
async function altualizarCliente(mysql, query)
{
    const conn = await connect(mysql);
    await conn.query(query);
    conn.end();
}
//SIGNERS
async function consultarSigners(mysql, contactId)
{
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT signers.SignerId, contacts.name from signers INNER JOIN contacts ON signers.ContactId = contacts.ContactId WHERE signers.ContactId LIKE "'+ contactId +'";');
    conn.end();
    return rows[0].name;
}

module.exports = {consultarClienteById, inserirCliente,consultarCliente, deletarCliente, altualizarCliente,consultarSigners}