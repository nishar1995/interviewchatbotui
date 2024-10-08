import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createMeetingSchema = z.object({
    topic: z.string().min(1, { message: 'Topic is required' }),
    agenda: z.string().min(1, { message: 'Agenda is required' }), 
    startTime: z.date().refine((value) => value !== null, 'Please select a start time'), 
});

// generate form types from zod validation schema
export type CreateMeetingInput = z.infer<typeof createMeetingSchema>;
