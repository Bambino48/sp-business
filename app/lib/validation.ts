import { z } from "zod"

export const businessSchema = z.object({

    name: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères"),

    category: z
        .string()
        .min(2, "La catégorie doit contenir au moins 2 caractères"),

    location: z
        .string()
        .min(2, "La localisation doit contenir au moins 2 caractères"),

})