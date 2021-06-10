const { TestWatcher } = require('@jest/core');
const mysql = require('mysql2/promise');
const db = require('../db');

const contactId = "ce95141c-47b2-4f23-a8cd-7a610225b371";
const signerId = "54648288-f80f-44c6-9602-c78a246df642";
const envelopId = "bd03d702-c284-4e3c-9651-3677d174770a";
const enveloptSignerId = "e96213b7-8d9e-4956-86f2-4306354bb45e";
const documentId = "2556c74b-b3d6-43b5-b96a-653dfbb8a0a0";
const historyEventId = "185aa99d-31f4-4da5-9d19-3c0f6ffb5990";

describe('Login e Cadastro', function () {
    test('Criar Contato', async () => {        
        let cognitoKey = "Cognito123";
        let name = "Sarah Novais";
        let email = "sarah.silva@ax4b.com";
        let password = '123Password';
        let signed = 0;

        await db.insertContact(mysql,contactId,cognitoKey,name,email,password);
        await db.insertSigner(mysql, signerId,signed,contactId);        
        
        expect(await db.consultarClienteById(mysql, contactId)).toBe("Sarah Novais");
        expect(await db.consultarSigners(mysql, contactId)).toBe("54648288-f80f-44c6-9602-c78a246df642");
    });
    test('Logar', async () => {
        let email = "sarah.silva@ax4b.com";
        let password = '123Password';
        expect(await db.logarSign(mysql,email,password)).toBe("Sarah Novais");
    });
});
describe('Envelope e Documentos', function (){
    test('Criar Envelops e EnvelopsSigners', async () =>
    {        
        let name = "Envelope Teste";
        let expireIn = "10 dias";
        let status = 5;
        let createdAt = '2021-08-06 00:00:00';
        let createdBy = 'Sarah Novais';
        let CustomMessage = 'Mensagem teste';
        let SignInOrder = 0;

        await db.insertEnvelop(mysql, envelopId, name,expireIn,status,createdAt,createdBy,CustomMessage,SignInOrder);
        await db.insertEnvelopSigner(mysql, enveloptSignerId, signerId, envelopId);

        expect(await db.ConsultarEnvelops(mysql, envelopId)).toBe("bd03d702-c284-4e3c-9651-3677d174770a")
        expect(await db.ConsultarEnvelopsSigner(mysql, enveloptSignerId)).toBe("e96213b7-8d9e-4956-86f2-4306354bb45e");
    });
    test('Criar documentos', async () => {
        
        let name = "Document trial";
        let location = "Localização Trial";
        let version = 123;
        let workspace = "Workspace trial";
        let uploadedAt = "2021-06-05";
        let uploadedBy = "Sarah Novais";
        let owner = "Sarah Novais";
        let archived = "Contrato 1";

        await db.insertDocuments(mysql, documentId, name, location, version,workspace,uploadedAt,uploadedBy,owner,archived,envelopId);
        expect(await db.ConsultarDocuments(mysql, documentId)).toBe("2556c74b-b3d6-43b5-b96a-653dfbb8a0a0");        
    });
    test('Consultar Envelopes por Signers', async () =>{
        expect(await db.ConsultarEnvelopsBySigner(mysql, signerId)).toBe("bd03d702-c284-4e3c-9651-3677d174770a");
    });
    test('Consultar Documents', async () =>
    {
        expect(await db.ConsultarDocumentsByEnvelops(mysql, envelopId)).toBe("2556c74b-b3d6-43b5-b96a-653dfbb8a0a0");
    });
    test('Criar evento', async () => {

        let triggeredAt = "2021-06-08";
        let triggeredBy = "Sarah Novais";
        let responseFromPdfLib = "Response Test";

        await db.insertHistoryEvent(mysql, historyEventId, envelopId, triggeredAt,triggeredBy,responseFromPdfLib);

        expect(await db.ConsultarHistoryEvent(mysql, historyEventId)).toBe("185aa99d-31f4-4da5-9d19-3c0f6ffb5990");
    })
});
// describe('Limpar registros', function () {
//     test('Limpar registros', async () => {
//         await db.deletar(mysql,'DELETE FROM Documents WHERE id LIKE "'+documentId+'"');
//         await db.deletar(mysql,'DELETE FROM HistoryEvents WHERE id LIKE "'+historyEventId+'"');
//         await db.deletar(mysql,'DELETE FROM Envelops_Signers WHERE id LIKE "'+enveloptSignerId+'"');
//         await db.deletar(mysql,'DELETE FROM Envelops WHERE id LIKE "'+envelopId+'"');
//         await db.deletar(mysql,'DELETE FROM Signers WHERE id LIKE "'+signerId+'"');
//         await db.deletar(mysql,'DELETE FROM Contacts WHERE id LIKE "'+contactId+'"');

//         expect(await db.consultarCliente(mysql, contactId)).toBe(false);
//     });
// });


