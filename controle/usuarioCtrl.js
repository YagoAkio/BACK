//camada de interface da API que traduz HTTP
import Usuario from "../modelo/usuario.js";

export default class UsuarioCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const { email, senha, prioridade } = requisicao.body;
    
            if (email && senha && prioridade > 0) {
                const usuario = new Usuario(0, email, senha, prioridade);
    
                usuario.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigoGerado: usuario.codigo,
                        mensagem: "Usuário incluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: `Erro ao registrar o usuário: ${erro.message}`
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, envie os dados completos e válidos do usuário!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método POST para cadastrar um usuário!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const { codigo, email, senha, prioridade } = requisicao.body;
    
            if (codigo && email && senha && prioridade) {
                const usuario = new Usuario(codigo, email, senha, prioridade);
    
                usuario.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Usuário atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: `Erro ao atualizar o usuário: ${erro.message}`
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, envie todos os dados válidos do usuário para atualização!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize os métodos PUT ou PATCH para atualizar um usuário!"
            });
        }
    }   

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const usuario = new Usuario(codigo);
                //resolver a promise
                usuario.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Usuario excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o usuario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do usuario!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um usuario!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const usuario = new Usuario();
            usuario.consultar(termo).then((listaUsuarios) => {
                resposta.json(
                    {
                        status: true,
                        listaUsuarios
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os usuarios: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar usuarios!"
            });
        }
    }
}