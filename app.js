////////////////////////////////////////////////////////////////////////

import express, { json } from "express"
import cors from 'cors'
import {clientesRouter} from './routes/clientesRoute.js'
import {landingRouter} from './routes/landingRoute.js'

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


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server escucha en: http://localhost:${PORT}`)
})