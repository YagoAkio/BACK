import Cliente from '../modelo/cliente.js';
import conectar from './conexao.js';

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente (
                    cpf VARCHAR(14) NOT NULL UNIQUE,
                    nome VARCHAR(200) NOT NULL,
                    email VARCHAR(200) NOT NULL,
                    telefone VARCHAR(20),
                    endereco VARCHAR(70),
                    bairro VARCHAR(50),
                    cidade VARCHAR(50),
                    uf VARCHAR(2) NOT NULL,
                    cep VARCHAR(30) NOT NULL,
                    CONSTRAINT pk_cliente PRIMARY KEY(cpf)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO cliente (cpf,nome,email,telefone, endereco, bairro, cidade, uf,cep)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

                
            `;
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.cep
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `
                UPDATE cliente 
                SET nome = ?, email = ?, telefone = ?,endereco = ?, bairro = ?, cidade = ?, uf = ?, cep = ?
                WHERE cpf = ?
            `;
            const parametros = [
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.cep,
                cliente.cpf
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf LIKE ?`;
            const parametros = [cliente.cpf];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = '';
        let parametros = [];

        if (termo.includes('@')) {
            // Busca por email
            sql = `SELECT * FROM cliente WHERE email LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else if (!isNaN(parseInt(termo))) {
            // Busca por CPF
            sql = `SELECT * FROM cliente WHERE cpf = ?`;
            parametros = [termo];
        } else {
            // Busca por nome
            sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        const listaClientes = linhas.map(linha => new Cliente(
            linha['cpf'],
            linha['nome'],
            linha['email'],
            linha['telefone'],
            linha['endereco'],
            linha['bairro'],
            linha['cidade'],
            linha['uf'],
            linha['cep']
        ));

        await conexao.release();
        return listaClientes;
    }
}
