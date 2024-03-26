import pg from 'pg'
import { fechaEntrega, fechaRecoger } from "../../functions/date.js"

const DB_CONFIG = {
    host: 'ep-misty-wildflower-a15bcnfp.ap-southeast-1.aws.neon.fl0.io',
    port: 5432,
    database: 'tamazulaDB',
    user: 'fl0user',
    password: 'nDG7lFTsHhL0',
    ssl: true
}

const getquery = 'SELECT c.nombre, c.apellidopaterno, c.apellidomaterno, co.colonia, c.calle, c.telefono, c.telefonoalt, r.fechaentrega, r.fecharecoger, e.estatus FROM public.clientes c JOIN rentas r ON c.id = r.clienteid JOIN colonias co ON c.coloniaid = co.id JOIN estatusrentas e ON r.estatusid = e.id;'


const client = new pg.Client(DB_CONFIG)
await client.connect()


export class ClienteModelo {
    static async getAll({ renta }) {
        const query = await client.query(getquery);
        console.log( query.rows[1] )
        return query.rows
    }

    static async getByNumTel({ numeroTelefono }) {

    }

    static async createCliente({input}) {

    }

    static async patchCliente({ numeroTelefono, input }) {

    }

    static async deleteCliente({ numeroTelefono }) {

    }
}

