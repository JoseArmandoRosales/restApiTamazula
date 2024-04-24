import pg from 'pg'

const DB_CONFIG = {
    host: 'ep-misty-wildflower-a15bcnfp.ap-southeast-1.aws.neon.fl0.io',
    port: 5432,
    database: 'tamazulaDB',
    user: 'fl0user',
    password: 'nDG7lFTsHhL0',
    ssl: true
}

const getRentas = 'SELECT * FROM get_all();'
const getRentasByEstatus = 'SELECT * FROM get_rentas_by_estatus($1);'
const getRentaById = 'SELECT * FROM get_rentas_by_id($1);'
const getRentaByIdAsRowFromTb = 'SELECT * FROM get_tbrentas_by_id($1);'
const postNewRenta = 'SELECT * FROM new_renta($1, $2, $3, $4);'
const deleteRenta = "SELECT * FROM delete_renta($1);"
const patchRenta = "SELECT * FROM update_renta($1, $2, $3, $4, $5);"
const getDataFromClient = 'SELECT * FROM get_by_id($1);'

const pool = new pg.Pool(DB_CONFIG)

export class RentaModelo {
    static async getAll() {
        const client = await pool.connect();
        try {
            const query = await client.query(getRentas);
            return query.rows
        } finally {
            client.release();
        }
    }

    static async getById({ id }) {
        const client = await pool.connect();
        try {
            const query = await client.query(getRentaById, [id.id])
            return query.rows
        } finally {
            client.release();
        }
    }

    static async getByEstatus({ id }) {
        const client = await pool.connect();
        try {
            const query = await client.query(getRentasByEstatus, [id.id])
            return query.rows
        } finally {
            client.release();
        }
    }

    static async createRenta(input) {
        const client = await pool.connect();
        try {
            const data = Object.values(input)
            const id = data[0]

            console.log(id);

            const searchClient = await client.query('SELECT * FROM get_by_id($1);', [id]);
            if (searchClient.rowCount === 0) return searchClient.rowCount

            const query = await client.query(postNewRenta, data);
            return { ...query.rows[0], ...input };
        } finally {
            client.release();
        }
    }

    static async deleteRenta({ id }) {
        const client = await pool.connect();
        try {
            const query = await client.query(deleteRenta, Object.values(id));
            return query.rows[0].delete_renta;
        } finally {
            client.release();
        }
    }

    static async patchRenta({ id, updateData }) {
        const client = await pool.connect();
        try {
            const getDataQuery = await client.query(getRentaByIdAsRowFromTb, [id.id])
            if (getDataQuery.rows.length === 0) {
                return 1
            }

            if (typeof updateData.clienteid !== 'undefined') {
                const checkNewIdClientExist = await client.query(getDataFromClient, [updateData.clienteid]);
                if (checkNewIdClientExist.rows.length === 0) {
                    return 2
                }
            }

            const data = getDataQuery.rows[0];
            const rentaUpdated = {
                ...data,
                ...updateData
            }

            const updateDataQuery = await client.query(patchRenta, Object.values(rentaUpdated))
            return updateDataQuery.rows[0];

        } finally {
            client.release();
        }
    }

}