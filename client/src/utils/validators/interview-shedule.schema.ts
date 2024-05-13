import { number } from "prop-types";
import { z } from "zod"

// form zod validation schema
export const interviewScheduleSchema = z.object({
    id: z.number(),
    active: z.string(),
    createdDate: z.date(),
    deleted: z.string(),
    interviewPeriodMinutes: z.number(),
    lastUpdatedDate: z.date(),
    scheduleStartDate: z.date(),
    scheduleStatusId: z.number(),
    updatedBy: z.number(),
    candidate: z.object({
        id: z.number(),
        active: z.string(),
        candidateEmail: z.string(),
        candidatePhone: z.string(),
        createdDate: z.date(),
        deleted: z.string(),
        lastUpdatedDate: z.date(),
        preferredTimezone: z.string(),
        resumeS3Path: z.string(),
        updatedBy: z.number(),
    }),
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
    }),

    jobPosting: z.object({
        id: z.number(),
        active: z.string(),
        createdDate: z.date(),
        deleted: z.string(),
        jdS3Path: z.string(),
        jobDescription: z.string(),
        jobHeader: z.string(),
        jobInterviewPeriodInMinutes: z.number(),
        lastUpdatedDate: z.date(),
        updatedBy: z.number(),
    }),


})

// generate form types from zod validation schema
export type tenantSchema = z.infer<typeof interviewScheduleSchema>;