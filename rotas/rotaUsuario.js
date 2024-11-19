import { Router } from "express";
import UsuarioCtrl from "../controle/usuarioCtrl.js";

const usuCtrl = new UsuarioCtrl();
const rotaUsuario = new Router();

rotaUsuario
.get('/', usuCtrl.consultar)
.get('/:termo', usuCtrl.consultar)
.post('/', usuCtrl.gravar)
.patch('/', usuCtrl.atualizar)
.put('/', usuCtrl.atualizar)
.delete('/', usuCtrl.excluir);

export default rotaUsuario;