import {z} from "zod";

export const loginFormSchema = z.object({
    email: z.email(),
    password: z.string().min(5).max(20),
})