import { ClienteModelo } from '../modelo/clientes.js';
import { validateCliente, validatePartialCliente } from "../schemas/clientesSchema.js"

export class ClienteControlador {

    static async getAll(req, res) {
        const { renta } = req.query
        const clientes = await ClienteModelo.getAll({ renta })

        res.json(clientes)
    }

    static async getByNumTel(req, res) {
        const { numeroTelefono } = req.params
        const cliente = await ClienteModelo.getByNumTel({ numeroTelefono })

        if (cliente) return res.json(cliente)
        res.status(404).json({ message: 'Not encontrado' })
    }

    static async createCliente(req, res) {
        const result = validateCliente(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newCliente = await ClienteModelo.createCliente({ input: result.data })
        res.status(201).json(newCliente)
    }

    static async patchCliente(req, res){
        const result = validatePartialCliente(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    
        const { numeroTelefono } = req.params
        const resultPatch = await ClienteModelo.patchCliente({numeroTelefono, input: result.data})
        if(resultPatch === false) return res.status(404).json({message: 'Cliente not found'})
    
        return res.json(resultPatch)
    }

    static async deleteCliente (req, res) {
        const { numeroTelefono } = req.params
        const result =  await ClienteModelo.deleteCliente({numeroTelefono})
        if (!result) return res.status(404).json({ message: 'Cliente not found' })
    
        return res.json({ message: 'Cliente deleted' })
    }
}