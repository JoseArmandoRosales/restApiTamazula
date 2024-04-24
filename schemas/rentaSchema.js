import { z } from 'zod';

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const rentaSchema = z.object({
    clienteid: z.number().min(1, { message: "Minimum ID cannot be less than 1" }),
    fechaentrega: z.string().regex(dateFormatRegex, { message: "Invalid date format. Please use YYYY-MM-DD." }).nullable(),
    fecharecoger: z.string().regex(dateFormatRegex, { message: "Invalid date format. Please use YYYY-MM-DD." }).nullable(),
    estatusid: z.number().min(1, { message: "Minimum ID cannot be less than 1" }).max(5, { message: "Max id = 5" }).default(1)
});

export function validateRenta(input) {
    return rentaSchema.partial({fechaentrega: true, fecharecoger: true}).safeParse(input);
}

export function validatePartialRenta(input) {
    return rentaSchema.partial().safeParse(input);
}