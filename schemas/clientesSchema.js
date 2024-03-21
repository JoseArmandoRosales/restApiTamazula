import z from 'zod'

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

export function validateCliente (input){
    return clienteSchema.safeParse(input)
}

export function validatePartialCliente (input){
    return clienteSchema.partial().safeParse(input)
}

