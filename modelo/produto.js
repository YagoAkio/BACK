import ProdutoDAO from "../persistencia/produtoDAO.js";

export default class Produto{
    #codigo;
    #descricao;
    #precoCusto;
    #precoVenda;
    #qtdEstoque;
    #urlImagem;
    #dataValidade;
    #categoria;
    #fornecedor;


    constructor(codigo=0,descricao="", precoCusto=0, 
                precoVenda=0, qtdEstoque=0,urlImagem="", dataValidade="",
                categoria={},fornecedor={}){
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#qtdEstoque=qtdEstoque;
        this.#urlImagem=urlImagem;
        this.#dataValidade=dataValidade; 
        this.#categoria=categoria;
        this.#fornecedor=fornecedor;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao=novaDesc;
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(novoPreco){
        this.#precoCusto = novoPreco
    }

    get precoVenda(){
        return this.#precoVenda;
    }
    
    set precoVenda(novoPreco){
        this.#precoVenda = novoPreco
    }


    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }

    get urlImagem(){
        return this.#urlImagem;
    }

    set urlImagem(novaUrl){
        this.#urlImagem=novaUrl;
    }

    get dataValidade(){
        return this.#dataValidade;
    }

    set dataValidade(novaData){
        this.#dataValidade = novaData;
    }

    get categoria(){
        return this.#categoria
    }

    set categoria(novaCategoria){
        this.#categoria = novaCategoria;
    }

    get fornecedor(){
        return this.#fornecedor
    }

    set fornecedor(novoFornecedor){
        this.#fornecedor = novoFornecedor;
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            descricao:this.#descricao,
            precoCusto:this.#precoCusto,
            precoVenda:this.#precoVenda,
            qtdEstoque:this.#qtdEstoque,
            urlImagem:this.#urlImagem,
            dataValidade:this.#dataValidade,
            categoria:this.#categoria.toJSON(),
            fornecedor:this.#fornecedor.toJSON()
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.gravar(this);
     }
 
     async excluir(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.excluir(this);
     }
 
     async alterar(){
        const prodDAO = new ProdutoDAO();
        await prodDAO.atualizar(this);
     }
 
     async consultar(termo){
        const prodDAO = new ProdutoDAO();
        return await prodDAO.consultar(termo);
     }

}

