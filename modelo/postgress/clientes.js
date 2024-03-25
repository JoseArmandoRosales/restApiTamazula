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


const client = new pg.Client(DB_CONFIG)
await client.connect()


export class ClienteModelo {
    static async getAll({ renta }) {
        const [query] = cliente.query('SELECT * FROM public.clientes ORDER BY id ASC LIMIT 100');
        return query
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

