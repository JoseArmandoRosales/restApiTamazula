import { Router } from 'express';
import {RentaControlador} from '../controlador/rentas.js';

export const rentasRouter = Router()

// Get de todos las /renta
rentasRouter.get('/', RentaControlador.getAll)
// Get de /renta especifica por id de renta
rentasRouter.get('/:id', RentaControlador.getById)
// Get de Cliente por estatusid
rentasRouter.get('/estatus/:id',RentaControlador.getByEstatus)
// Post a /clientes
rentasRouter.post('/',  RentaControlador.createRenta)
// Delete a Clientes/"id"
rentasRouter.delete('/:id', RentaControlador.deleteRenta)
// Patch a /clientes/"NumTel"
rentasRouter.patch('/:id', RentaControlador.patchRenta)
