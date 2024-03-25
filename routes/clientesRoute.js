import { Router } from 'express'
import {ClienteControlador} from '../controlador/clientes.js';


export const clientesRouter = Router()

clientesRouter.get('/', ClienteControlador.getAll)
clientesRouter.get('/:numeroTelefono', ClienteControlador.getByNumTel)
clientesRouter.post('/',  ClienteControlador.createCliente)
clientesRouter.patch('/:numeroTelefono', ClienteControlador.patchCliente)
clientesRouter.delete('/:numeroTelefono', ClienteControlador.deleteCliente)  