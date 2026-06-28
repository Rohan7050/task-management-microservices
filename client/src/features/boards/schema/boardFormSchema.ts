import {z} from "zod";

export const boardFormSchema = z.object({
    title: z.string().min(4).max(20),
    desc: z.string().max(100)
})