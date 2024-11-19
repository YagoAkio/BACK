import Usuario from '../modelo/usuario.js'; // Ajuste o caminho conforme necessário
import conectar from './conexao.js';

export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    senha VARCHAR(255) NOT NULL,
                    prioridade INT NOT NULL,
                    CONSTRAINT pk_usuario PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO usuario (email, senha, prioridade)
                VALUES (?, ?, ?)
            `;
            const parametros = [usuario.email, usuario.senha, usuario.prioridade];
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async atualizar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `
                UPDATE usuario
                SET email = ?, senha = ?, prioridade = ?
                WHERE codigo = ?
            `;
            const parametros = [usuario.email, usuario.senha, usuario.prioridade, usuario.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `
                DELETE FROM usuario
                WHERE codigo = ?
            `;
            const parametros = [usuario.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = '';
        let parametros = [];

        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT * FROM usuario
                WHERE email LIKE ?
            `;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `
                SELECT * FROM usuario
                WHERE codigo = ?
            `;
            parametros = [termo];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        const listaUsuarios = linhas.map(linha => {
            return new Usuario(
                linha['codigo'],
                linha['email'],
                linha['senha'],
                linha['prioridade']
            );
        });

        await conexao.release();
        return listaUsuarios;
    }
}
