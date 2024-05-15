import { z } from 'zod'
// form zod validation schema
export const jobPostingSchema = z.object({
    job_id: z.string(),
    title: z.string(),
    description: z.string(),
    company: z.string(),
    location: z.string(),
    salary: z.string()

    // id: z.number(),
    // active: z.string(),
    // createdDate: z.date(),
    // deleted: z.string(),
    // jdS3Path: z.string(),
    // jobDescription: z.string(),
    // jobHeader: z.string(),
    // jobInterviewPeriodInMinutes: z.number(),
    // lastUpdatedDate: z.date(),
    // updatedBy: z.number(),
    // tenant: z.object({
    //     id: z.number(),
    //     active: z.string(),
    //     addressLine1: z.string(),
    //     addressLine2: z.string(),
    //     city: z.string(),
    //     country: z.string(),
    //     createdDate: z.date(),
    //     deleted: z.string(),
    //     lastUpdatedDate: z.date(),
    //     name: z.string(),
    //     primaryContactEmail: z.string(),
    //     primaryContactPhone: z.string(),
    //     state: z.string(),
    //     timezone: z.string(),
    //     updatedBy: z.number(),
    //     zip: z.string()
    // })

})
// generate form types from zod validation schema
export type jobPostingSchema = z.infer<typeof jobPostingSchema>

