import { emitWarning } from "process";
import { z } from "zod";


export const userLoginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(3).max(40)
})

export const userRegisterSchema=z.object({
    name:z.string().min(4),
    email:z.string().email(),
    password:z.string().min(4).max(40)
})