import Categoria from "../modelo/categoria.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class CategoriaDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    descricao VARCHAR(50) NOT NULL,
                    CONSTRAINT pk_categoria PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela categoria!");
        }
    }
    
    async gravar(categoria){
        if (categoria instanceof Categoria){
            const sql = "INSERT INTO categoria(descricao) VALUES(?)"; 
            const parametros = [categoria.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            categoria.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(categoria){
        if (categoria instanceof Categoria){
            const sql = "UPDATE categoria SET descricao = ? WHERE codigo = ?"; 
            const parametros = [categoria.descricao, categoria.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(categoria){
        if (categoria instanceof Categoria){
            const sql = "DELETE FROM categoria WHERE codigo = ?"; 
            const parametros = [categoria.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da categoria
            sql='SELECT * FROM categoria WHERE codigo = ? order by descricao';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM categoria WHERE descricao like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaCategoria = [];
         for (const registro of registros){
            const categoria = new Categoria(registro['codigo'],
                                            registro['descricao']    
            );
            listaCategoria.push(categoria);
        }
        return listaCategoria;
    }
}