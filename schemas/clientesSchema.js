import z from 'zod'

const clienteSchema = z.object({
    nombre: z.string().max(50).nullable(),
    apellidopaterno: z.string().max(30).nullable(),
    apellidomaterno: z.string().max(30).nullable(),
    coloniaid: z.number().nullable(),
    calle: z.string().max(50).nullable(),
    telefono: z.string().max(16).min(7).nullable(),
    telefonoalt: z.string().max(16).min(7).nullable()
})

export function validateCliente (input){
    return clienteSchema.partial().safeParse(input)
}
