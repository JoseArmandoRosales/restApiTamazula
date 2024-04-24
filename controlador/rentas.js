import { RentaModelo } from '../modelo/postgress/rentas.js';
import { idClienteSchema } from '../schemas/idClienteSchema.js';
import { validateRenta } from '../schemas/rentaSchema.js';
import { validatePartialRenta } from '../schemas/rentaSchema.js';
import { datosFaltantesRenta } from '../functions/detectarDatosFaltantesRenta.js';

export class RentaControlador {

    static async getAll(req, res) {
        const rentas = await RentaModelo.getAll()
        res.json(rentas)
    }

    static async getById(req, res){
        if(isNaN(parseInt(req.params.id)) ){
            return res.status(400).json({ message: 'Not a Number Detected' })
        }
        req.params.id = parseInt(req.params.id)

        const id = idClienteSchema(req.params)
        if (id.error) {
            return res.status(400).json({ error: JSON.parse(id.error.message) })
        }

        const renta = await RentaModelo.getById({id: id.data})
        if (renta && renta.length > 0) return res.json(renta)
        res.status(404).json({ message: 'Not encontrado' })
    }

    static async getByEstatus(req, res){
        if(isNaN(parseInt(req.params.id)) ){
            return res.status(400).json({ message: 'Not a Number Detected' })
        }
        req.params.id = parseInt(req.params.id)

        const id = idClienteSchema(req.params)
        if (id.error) {
            return res.status(400).json({ error: JSON.parse(id.error.message) })
        }

        const renta = await RentaModelo.getByEstatus({id: id.data})

        if (renta && renta.length > 0) return res.json(renta)
        res.status(404).json({ message: 'Rentas con ese estatus no encontradas' })
    }

    static async createRenta(req, res) {
        const body = validateRenta(req.body)
        if (body.error) { return res.status(400).json({ error: JSON.parse(body.error.message) })}

        const completedData = datosFaltantesRenta(body.data)
        const newRenta = await RentaModelo.createRenta(completedData)
        if ( newRenta === 0 ) return res.status(400).json({error: "Bad Request, Cliente no Existe"})
        res.status(201).json(newRenta)

    }

    static async deleteRenta (req, res) {
        if(isNaN(parseInt(req.params.id)) ){
            return res.json({ message: 'Not a Number Detected' })
        }
        req.params.id = parseInt(req.params.id)

        const validation = idClienteSchema(req.params)
        if (validation.error) {
            return res.status(400).json({ error: JSON.parse(validation.error.message) })
        }
        
        const result =  await RentaModelo.deleteRenta({id :validation.data})

        if (!result) return res.status(404).json({ message: 'Renta not found' })
        return res.json({ message: 'Cliente deleted' })
    }

    static async patchRenta(req, res){
        if(isNaN(parseInt(req.params.id)) ){
            return res.json({ message: 'Not a Number Detected' })
        }
        req.params.id = parseInt(req.params.id)

        const id = idClienteSchema(req.params)
        if (id.error) {
            return res.status(400).json({ error: JSON.parse(id.error.message) })
        }

        const result = validatePartialRenta(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const resultPatch = await RentaModelo.patchRenta({id: id.data, updateData: result.data})

        switch(resultPatch) {
            case 1:
                return res.status(404).json({message: 'Renta not found'})              
            case 2:
                return res.status(404).json({message: 'User tried to write new client that doesnt exists'})
            default:
                return res.json(resultPatch)
          }
    }


}