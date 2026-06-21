import {z} from "zod";

export const boardFormSchema = z.object({
    title: z.email().min(4).max(20),
    desc: z.string().max(100)
})