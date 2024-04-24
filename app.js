////////////////////////////////////////////////////////////////////////

import express, { json } from "express"
import cors from 'cors'
import {landingRouter} from './routes/landingRoute.js'
import {clientesRouter} from './routes/clientesRoute.js'
import {rentasRouter} from './routes/rentasRoute.js'
import dotenv from 'dotenv';

////////////////////////////////////////////////////////////////////////

dotenv.config();

////////////////////////////////////////////////////////////////////////

const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

////////////////////////////////////////////////////////////////////////


// Ruta LANDING
app.get('/', landingRouter)

// Ruta Clientes
app.use('/clientes', clientesRouter)

// Ruta Rentas
app.use('/rentas', rentasRouter)


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server escucha en: http://localhost:${PORT}`)
})