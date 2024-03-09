const z = require('zod')

const clienteSchema = z.object({
    nombre: z.string(),
    apellidoPaterno: z.string(),
    apellidoMaterno: z.string(),
    curp: z.string(),
    colonia: z.string(),
    calle: z.string(),
    numeroTelefono: z.string().max(10).min(7),
    renta: z.string()
})

function validateCliente (input){
    return clienteSchema.safeParse(input)
}

function validatePartialCliente (input){
    return clienteSchema.partial().safeParse(input)
}

module.exports = {validateCliente, validatePartialCliente}