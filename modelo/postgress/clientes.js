import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const DB_CONFIG = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: true
};

const pool = new pg.Pool(DB_CONFIG)

const getQuery = 'SELECT * FROM get_clientes();'
const getQueryById = 'SELECT * FROM get_by_id($1);';
const postNewCliente = 'SELECT new_cliente($1, $2, $3, $4, $5, $6, $7) AS id;';
const updateQuery = 'SELECT * FROM update_cliente($1, $2, $3, $4, $5, $6, $7, $8);';
const deleteCliente = 'SELECT delete_cliente($1);';

export class ClienteModelo {
    static async getAll() {
        const client = await pool.connect();
        try {
            const query = await client.query(getQuery);
            return query.rows
        } finally {
            client.release();
        }
    }

    static async getById({ id }) {
        const client = await pool.connect();
        try {
            const query = await client.query(getQueryById, [id.id])
            return query.rows
        } finally {
            client.release();
        }
    }

    static async getByNumTel({ numeroTelefono }) {
        const client = await pool.connect();
        try {
            const query = await client.query(getQuery);
            const data = query.rows
            const regex = /\s+/g        // Regex: "/" =  inicio o fin de la regex --- "/s" = blankspace --- "+" = lo anterior puede aparecer más de una vez --- "g" = globalMatch (buscar en todo el texto)

            const clientes = [];
            for (const persona of data) {
                // Los && es un AND para validar que no sea un nulo, porque si no truena el .replace, si es nulo cualquier valor, se retorna un falso
                if ((persona.telefono && persona.telefono.replace(regex, '') === numeroTelefono) ||
                    (persona.telefonoalt && persona.telefonoalt.replace(regex, '') === numeroTelefono)) {
                    clientes.push(persona);
                }
            }
            return clientes;
        } finally {
            client.release();
        }
    }

    static async createCliente({ input }) {
        const client = await pool.connect();
        try {
            const query = await client.query(postNewCliente, Object.values(input));
            return { ...query.rows[0], ...input };
        } finally {
            client.release();
        }
    }

    static async patchCliente({ id, newData }) {
        const client = await pool.connect();
        try {
            const getDataQuery = await client.query(getQueryById, [id.id])
            const data = getDataQuery.rows

            if (data.length === 0) {
                return false
            }

            const updateCliente = {
                ...data[0],
                ...newData
            }

            const updateDataQuery = await client.query(updateQuery, Object.values(updateCliente))
            return updateDataQuery.rows[0];
        } finally {
            client.release();
        }
    }

    static async deleteCliente({ id }) {
        const client = await pool.connect();
        try {
            const query = await client.query(deleteCliente, Object.values(id));
            return query.rows[0].delete_cliente;
        } finally {
            client.release();
        }
    }
}

