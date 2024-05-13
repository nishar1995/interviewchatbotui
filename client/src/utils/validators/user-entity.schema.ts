import { z } from 'zod';

// form zod validation schema
export const userEntitySchema = z.object({
    tenant_user_id: z.number(),
    username: z.string().email(),
    roles: z.object({
        id: z.number(),
        role: z.string()
    }),
    role:z.number(),
    user_email_id: z.string().email(),
    active: z.boolean(),
    updated_by: z.string(),
    tenant_id: z.number(),
    store_id: z.number(),
    created_date: z.date(),
    last_updated_date: z.date()
});

// generate form types from zod validation schema
export type userEntitySchema = z.infer<typeof userEntitySchema>;
