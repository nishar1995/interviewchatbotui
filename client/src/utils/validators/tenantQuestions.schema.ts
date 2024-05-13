import { z } from "zod"

// form zod validation schema
export const tenantQuestionsSchema = z.object({
    id: z.number(),
    active: z.string(),
    category: z.number(),
    createdDate: z.date(),
    deleted: z.string(),
    lastUpdatedDate: z.date(),
    question: z.string(),
    seachKeywords: z.string(),
    updatedBy: z.number(),
    tenant: z.object({
        id: z.number(),
        active: z.string(),
        addressLine1: z.string(),
        addressLine2: z.string(),
        city: z.string(),
        country: z.string(),
        createdDate: z.date(),
        deleted: z.string(),
        lastUpdatedDate: z.date(),
        name: z.string(),
        primaryContactEmail: z.string(),
        primaryContactPhone: z.string(),
        state: z.string(),
        timezone: z.string(),
        updatedBy: z.number(),
        zip: z.string()
    })

})

// generate form types from zod validation schema
export type tenantSchema = z.infer<typeof tenantQuestionsSchema>;