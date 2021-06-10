//TDD
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
    return connection;
}

//#region  INSERTS
async function insertContact(mysql, contactId, cognitoKey, name, email, password)
{
    const conn = await connect(mysql);
    await conn.query('INSERT INTO Contacts (id, cognitoKey, name, email) VALUES("'+ contactId +'","'+cognitoKey+'", "'+name+'" ,"'+email+'")');
    conn.end();
}
async function insertSigner (mysql, signerId, signed, contactId)
{
    const conn = await connect(mysql);
    await conn.query('INSERT INTO Signers (id, signed, contact_Id) VALUES ("'+signerId+'", "'+signed+'" ,"'+contactId+'")');
    conn.end();
}
async function insertEnvelop(mysql,id,name,expireIn,status,createdAt,createdBy,customMessage,signInOrder){

    const conn = await connect(mysql);
    await conn.query('INSERT INTO Envelops (id,name,expireIn,status,createdAt,createdBy,customMessage,signInOrder) VALUES("'+id+'","'+name+'","'+expireIn+'","'+status+'","'+createdAt+'","'+createdBy+'","'+customMessage+'","'+signInOrder+'")');
    conn.end();
}
async function insertEnvelopSigner(mysql,id,signer_Id,envelop_Id){
    const conn = await connect(mysql);
    await conn.query('INSERT INTO Envelops_Signers(id,signer_Id,envelop_Id)VALUES ("'+id+'","'+signer_Id+'","'+envelop_Id+'");');
    conn.end();
}
async function insertDocuments(mysql,documentId,name,location,version,workspace,uploadedAt,uploadedBy,owner,archived,envelopId){
    const conn = await connect(mysql);
    await conn.query('INSERT INTO Documents (id,envelop_id,name,location,version,workspace,uploadedAt,uploadedBy,owner,archived)VALUES("'+documentId+'","'+envelopId+'","'+name+'","'+location+'","'+version+'","'+workspace+'","'+uploadedAt+'","'+uploadedBy+'","'+owner+'","'+archived+'");');
    conn.end();
}
async function insertHistoryEvent (mysql, historyEventId, envelopId, triggeredAt,triggeredBy,responseFromPdfLib)
{
    const conn = await connect(mysql);
    await conn.query('INSERT INTO HistoryEvents (id, envelop_id, triggeredAt, triggeredBy, responseFromPdfLib) VALUES ("'+historyEventId+'", "'+envelopId+'" ,"'+triggeredAt+'","'+triggeredBy+'","'+responseFromPdfLib+'")');
    conn.end();
}
//#endregion

//#region  SELECTS
async function consultarCliente(mysql, contactId)
{
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT * FROM Contacts WHERE id LIKE "'+contactId+'"');
    conn.end();
    
    if (rows.length > 0)
        return true;
    else
        return false;
}
async function consultarClienteById(mysql, contactId)
{
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT * FROM Contacts WHERE id LIKE "'+contactId+'"');
    conn.end();
    return rows[0].name;
}
async function consultarSigners(mysql, contactId)
{
    const conn = await connect(mysql);
    const [rows] = await conn.query('SELECT Signers.id, Contacts.name from Signers INNER JOIN Contacts ON Signers.contact_Id = Contacts.id WHERE Signers.contact_Id LIKE "'+ contactId +'";');
    conn.end();
    return rows[0].id;
}
async function logarSign(mysql, email, password){
    const conn = await connect(mysql);
    const [row] = await conn.query('SELECT * FROM Contacts WHERE email LIKE "'+email+'"');
    conn.end();
    return row[0].name;
}
async function ConsultarEnvelops(mysql, envelopId){
    const conn = await connect(mysql);
    const [row] = await conn.query('SELECT * from Envelops WHERE id LIKE "'+envelopId+'";');
    conn.end();
    return row[0].id;
}
async function ConsultarEnvelopsSigner(mysql, envelopsSignerId){
    const conn = await connect(mysql);
    const [row] = await conn.query('SELECT * from Envelops_Signers WHERE id LIKE "'+envelopsSignerId+'";');
    conn.end();
    return row[0].id;
}
async function ConsultarDocuments(mysql, documentId){
    const conn = await connect(mysql);
    const [row] = await conn.query('SELECT * from Documents WHERE id LIKE "'+documentId+'";');
    conn.end();
    return row[0].id;
}
async function ConsultarEnvelopsBySigner(mysql, signerId){
    const conn = await connect(mysql);
    const [row] = await conn.query('select Envelops.id from Signers INNER JOIN Envelops_Signers ON Signers.id = Envelops_Signers.signer_Id INNER JOIN Envelops ON Envelops_Signers.envelop_Id = Envelops.id WHERE Signers.id LIKE "'+signerId+'"');
    conn.end();
    return row[0].id;
}
async function ConsultarDocumentsByEnvelops(mysql, envelopId){
    const conn = await connect(mysql);
    const [row] = await conn.query('SELECT * from Documents WHERE envelop_Id LIKE "'+envelopId+'";');
    conn.end();
    return row[0].id;
}
async function ConsultarHistoryEvent(mysql, historyEventsId){
    const conn = await connect(mysql);
    const [row] = await conn.query('SELECT * from HistoryEvents WHERE id LIKE "'+historyEventsId+'";');
    conn.end();
    return row[0].id;
}
//#endregion

async function deletar(mysql, query)
{
    const conn = await connect(mysql);
    await conn.query(query);
    conn.end();
}



//Não utilizado
async function atualizarCliente(mysql, query)
{
    const conn = await connect(mysql);
    await conn.query(query);
    conn.end();
}
//SIGNERS
module.exports = {insertContact, insertSigner, consultarClienteById, consultarSigners,logarSign, deletar ,consultarCliente, insertDocuments, insertEnvelop,ConsultarEnvelops,insertEnvelopSigner,ConsultarEnvelopsSigner,ConsultarDocuments,ConsultarEnvelopsBySigner,ConsultarDocumentsByEnvelops,insertHistoryEvent,ConsultarHistoryEvent}