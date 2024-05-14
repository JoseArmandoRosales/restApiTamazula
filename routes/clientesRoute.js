import { Router } from 'express'
import {ClienteControlador} from '../controlador/clientes.js';

export const clientesRouter = Router()

// Get de todos los /clientes y con query por estatus
clientesRouter.get('/', ClienteControlador.getAll)
// Get de Cliente por id
clientesRouter.get('/:id',ClienteControlador.getById)
// Get de /clientes/"NumeroTel"
clientesRouter.get('/telefono/:numeroTelefono', ClienteControlador.getByNumTel)
// Post a /clientes
clientesRouter.post('/',  ClienteControlador.createCliente)
// Patch a /clientes/"NumTel"
clientesRouter.patch('/:id', ClienteControlador.patchCliente)
// Delete a Clientes/"id"
clientesRouter.delete('/:id', ClienteControlador.deleteCliente)

//POST para hacer un GET de consulta especifica
clientesRouter.post('/consultas', ClienteControlador.consultas)