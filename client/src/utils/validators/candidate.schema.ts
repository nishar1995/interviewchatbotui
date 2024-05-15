import { z } from 'zod';

// form zod validation schema
export const candidateSchema = z.object({

    name: z.string(),
    job_id: z.string(),
    resume: z.array(z.instanceof(File)),
    username: z.string(),
    //role: z.string(),
    meetingSchedule: z.string(),
    email:z.string(),
    phone_number : z.string(),
    application_id:z.string()
    // id: z.number(),
    // active: z.string(),
    // candidateEmail: z.string(),
    // candidatePhone: z.string(),
    // createdDate: z.date(),
    // deleted: z.string(),
    // lastUpdatedDate: z.date(),
    // preferredTimezone: z.string(),
    // resumeS3Path: z.string(),
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

});

// generate form types from zod validation schema
export type userEntitySchema = z.infer<typeof candidateSchema>;
