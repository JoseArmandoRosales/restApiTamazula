// import { ClienteModelo } from '../modelo/local-file/clientes.js';
import { ClienteModelo } from '../modelo/postgress/clientes.js';
import { validateCliente } from "../schemas/clientesSchema.js"
import { idClienteSchema } from '../schemas/idClienteSchema.js';

import {datosfaltantes} from '../functions/detectarDatosFaltantes.js'
import {validarObjetoEsVacio} from '../functions/validarObjetoNoVacio.js';


export class ClienteControlador {

    static async getAll(req, res) {
        const clientes = await ClienteModelo.getAll()
        res.json(clientes)
    }

    static async getByNumTel(req, res) {
        const { numeroTelefono } = req.params
        const cliente = await ClienteModelo.getByNumTel({ numeroTelefono })

        if (cliente) return res.json(cliente)
        res.status(404).json({ message: 'Not encontrado' })
    }

    static async getById(req, res){
        if(isNaN(parseInt(req.params.id)) ){
            return res.json({ message: 'Not a Number Detected' })
        }
        req.params.id = parseInt(req.params.id)

        const id = idClienteSchema(req.params)
        if (id.error) {
            return res.status(400).json({ error: JSON.parse(id.error.message) })
        }

        const cliente = await ClienteModelo.getById({id: id.data})
        
        if (cliente && cliente.length > 0) return res.json(cliente)
        res.status(404).json({ message: 'Not encontrado' })
    }

    static async createCliente(req, res) {
        const result = validateCliente(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const completeData = datosfaltantes(result.data)
        if ( validarObjetoEsVacio(completeData) ){
            return res.status(400).json({ error: 'No Data Sended' })
        }

        const newCliente = await ClienteModelo.createCliente({ input: completeData })
        res.status(201).json(newCliente)
    }

    static async patchCliente(req, res){
        if(isNaN(parseInt(req.params.id)) ){
            return res.json({ message: 'Not a Number Detected' })
        }
        req.params.id = parseInt(req.params.id)

        const id = idClienteSchema(req.params)
        if (id.error) {
            return res.status(400).json({ error: JSON.parse(id.error.message) })
        }

        const result = validateCliente(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    
        const resultPatch = await ClienteModelo.patchCliente({id: id.data, input: result.data})
        if(resultPatch === false) return res.status(404).json({message: 'Cliente not found'})
    
        return res.json(resultPatch)
    }

    static async deleteCliente (req, res) {
        if(isNaN(parseInt(req.params.id)) ){
            return res.json({ message: 'Not a Number Detected' })
        }
        req.params.id = parseInt(req.params.id)

        const validation = idClienteSchema(req.params)
        if (validation.error) {
            return res.status(400).json({ error: JSON.parse(validation.error.message) })
        }
        
        const result =  await ClienteModelo.deleteCliente({id :validation.data})
        if (!result) return res.status(404).json({ message: 'Cliente not found' })
        return res.json({ message: 'Cliente deleted' })
    }
}