import {z} from "zod";

export const registerFormSchema = z.object({
    username: z.string().min(4).max(20),
    email: z.email(),
    password: z.string().min(5).max(20),
})