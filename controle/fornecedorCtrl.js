import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const { cnpj,nome, email, telefone, endereco, bairro, cidade, uf, cep } = requisicao.body;

            if (cnpj && nome && email && telefone && endereco && bairro && cidade && uf && cep) {
                const fornecedor = new Fornecedor(cnpj, nome, email,telefone, endereco, bairro, cidade, uf, cep);

                fornecedor.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor incluído com sucesso!",
                       
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o fornecedor: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados obrigatórios do fornecedor conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um fornecedor!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const { cnpj, nome, email, telefone, endereco,bairro, cidade, uf, cep } = requisicao.body;

            if (cnpj && nome && email && telefone && endereco && bairro && cidade && uf && cep) {
                const fornecedor = new Fornecedor(cnpj,nome,email, telefone, endereco, bairro, cidade, uf, cep);

                fornecedor.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o fornecedor: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados obrigatórios do fornecedor conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um fornecedor!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const { cnpj } = requisicao.body;

            if (cnpj) {
                const fornecedor = new Fornecedor(cnpj);

                fornecedor.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o fornecedor: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CNPJ do fornecedor!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um fornecedor!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }

        if (requisicao.method === "GET") {
            const fornecedor = new Fornecedor();
            fornecedor.consultar(termo).then((listaFornecedores) => {
                resposta.json({
                    status: true,
                    listaFornecedores
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível obter os fornecedores: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar fornecedores!"
            });
        }
    }
}
