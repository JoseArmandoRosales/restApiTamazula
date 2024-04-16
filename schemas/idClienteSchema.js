import z from 'zod'

const deleteByIdSchema = z.object({
    id: z.number().min(1, {message: "Minimun ID Canot be less than 1"})
})

export function idClienteSchema (input){
    return deleteByIdSchema.safeParse(input)
}