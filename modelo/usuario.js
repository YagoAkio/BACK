import UsuarioDAO from "../persistencia/usuarioDAO.js";

export default class Usuario{
    #codigo;
    #email;
    #senha;
    #prioridade;


    constructor(codigo = 0, email = "", senha = "", prioridade = 0) {
        this.#codigo = codigo;
        this.#email = email;
        this.#senha = senha;
        this.#prioridade = prioridade;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email=novoEmail;
    }

    get senha(){
        return this.#senha
    }
    
    set senha(novaSenha){
        this.#senha = novaSenha
    }

    get prioridade(){
        return this.#prioridade;
    }

    set prio(novaPrioridade){
        this.#prioridade = novaPrioridade
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            email:this.#email,
            senha:this.#senha,
            prioridade:this.#prioridade
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.gravar(this);
     }
 
     async excluir(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
     }
 
     async alterar(){
        const usuDAO = new UsuarioDAO();
        await usuDAO.atualizar(this);
     }
 
     async consultar(termo){
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(termo);
     }

}

