import clientes from '../../clientes.json' assert {type: 'json'}
import { fechaEntrega, fechaRecoger } from "../../functions/date.js"

export class ClienteModelo {
    static async getAll({ renta }) {
        if (renta) {
            const rentaLower = renta.toLowerCase();
            const data = clientes.filter(cliente => {
                return cliente.renta.toLowerCase() === rentaLower
            })
            return data
        }
        return clientes
    }

    static async getByNumTel({ numeroTelefono }) {
        const cliente = clientes.find(cliente => cliente.numeroTelefono === numeroTelefono)
        return cliente
    }

    static async createCliente({input}) {
        const newCliente = {
            ...input,
            fechaEntrega: fechaEntrega(),
            fechaRecoger: fechaRecoger()
        }
        clientes.push(newCliente)
        return newCliente
    }

    static async patchCliente({ numeroTelefono, input }) {
        const clienteIndex = clientes.findIndex(cliente => cliente.numeroTelefono === numeroTelefono)
        if (clienteIndex === -1) return false

        const updateCliente = {
            ...clientes[clienteIndex],
            ...input
        }
        clientes[clienteIndex] = updateCliente

        return updateCliente
    }

    static async deleteCliente({ numeroTelefono }) {
        const clienteIndex = clientes.findIndex(cliente => cliente.numeroTelefono === numeroTelefono)
        if (clienteIndex === -1) return false
        clientes.splice(clienteIndex, 1)
        return true
    }
}

