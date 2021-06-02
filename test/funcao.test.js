const mysql = require('mysql2/promise');
const db = require('../db')

const cliente1 = "8417bb1a-088d-45f0-9e5b-ed1dac28749d";
const cliente2 = "ce95141c-47b2-4f23-a8cd-7a610225b371";

describe('Clientes', function () {

    test('Inserir', async () => {
        const query = 'INSERT INTO contacts (ContactId, CognitoKey, name, email) VALUES("'+ cliente2 +'","123456", "João Medeiros" ,"joao.medeiros@ax4b.com")';
        await db.inserirCliente(mysql, query);
        expect(await db.consultarClienteById(mysql,cliente2)).toBe("João Medeiros");
    });

    test('Consultar', async () => {
        expect(await db.consultarClienteById(mysql,cliente1)).toBe('Leandro Garcia');
    });

    test ('Atualizar', async () =>{
        const query = 'UPDATE contacts SET name = "João Maria" WHERE ContactId LIKE "'+ cliente2 +'";';
        await db.altualizarCliente(mysql,query);
        expect(await db.consultarClienteById(mysql,cliente2)).toBe("João Maria");
    })

    test('Deletar', async () => {
        await db.deletarCliente(mysql, cliente2);
        expect(await db.consultarCliente(mysql, cliente2)).toBe(false);
    });
});

describe('Signers', function (){
    test('Consultar', async () => {
        expect(await db.consultarSigners(mysql,cliente1)).toBe("Leandro Garcia");        
    })
}); 



