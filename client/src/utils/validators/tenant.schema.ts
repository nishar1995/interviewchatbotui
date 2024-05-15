import { add } from "lodash";
import {z } from "zod"

// form zod validation schema
export const tenantSchema = z.object({
    // id: z.number(),
    address_line1: z.string(),
    address_line2: z.string(),
    city: z.string(),
    country: z.string(),
    // createdDate: z.date(),
    // deleted: z.number(),
    // lastUpdatedDate: z.date(),
    name: z.string(),
    // primaryContactEmail: z.string().email(),
    // primaryContactPhone: z.string(),
    state:z.string(),
    // timezone: z.string(),
    // updatedBy: z.number(),
    zip_code: z.string()
  })

 // generate form types from zod validation schema
export type tenantSchema = z.infer<typeof tenantSchema>;
