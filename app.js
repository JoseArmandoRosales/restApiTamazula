////////////////////////////////////////////////////////////////////////

const express = require("express")
const cors = require("cors")
const {fechaEntrega, fechaRecoger} = require("./functions/date")


const clientes = require('./clientes.json')
const { validateCliente, validatePartialCliente } = require("./schemas/clientesSchema")


const app = express()
app.use(cors())
app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 1234

////////////////////////////////////////////////////////////////////////

// Ruta basica
app.get('/', (req, res) => {
    res.json({ message: 'HelloWorld' })
})

// Todas las peliculas
app.get('/clientes', (req, res) => {
    const { renta } = req.query
    if (renta) {
        const rentaLower = renta.toLowerCase();
        const data = clientes.filter(cliente => {
            return cliente.renta.toLowerCase() === rentaLower
        })
        return res.json(data)
    }
    res.json(clientes)
})

// Una pelicua en especifico
app.get('/clientes/:numeroTelefono', (req, res) => { // parametro dinamico (Se puede usar regex (expresiones regulares en el PATH, path-to-regex)) 
    const { numeroTelefono } = req.params
    const cliente = clientes.find(cliente => cliente.numeroTelefono === numeroTelefono)
    if (cliente) return res.json(cliente)
    res.status(404).json({ message: 'Not encontrado' })
})

// Crear un cliente 
app.post('/clientes', (req, res) => {
    const result = validateCliente(req.body)
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newCliente = {
        ...result.data,
        fechaEntrega: fechaEntrega(),
        fechaRecoger: fechaRecoger()
    }
    clientes.push(newCliente)
    res.status(201).json(newCliente)

})

// Patchear partes o todo de un clientes
app.patch('/clientes/:numeroTelefono', (req, res) => {
    const result = validatePartialCliente(req.body)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })


    const { numeroTelefono } = req.params
    const clienteIndex = clientes.findIndex(cliente => cliente.numeroTelefono === numeroTelefono)
    if (clienteIndex === -1) return res.status(404).json({ message: 'Not encontrado' })

    const updateCliente = {
        ...clientes[clienteIndex],
        ...result.data
    }

    clientes[clienteIndex] = updateCliente

    return res.json(updateCliente)
})

// Borrar un cliente
app.delete('/clientes/:numeroTelefono', (req, res) => {
    const { numeroTelefono } = req.params
    const clienteIndex = clientes.findIndex(cliente => cliente.numeroTelefono === numeroTelefono)

    if (clienteIndex === -1) {
        return res.status(404).json({ message: 'Cliente not found' })
    }
    clientes.splice(clienteIndex, 1)
    return res.json({ message: 'Cliente deleted' })
})


app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})