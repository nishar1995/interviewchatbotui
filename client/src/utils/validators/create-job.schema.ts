import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createJobSchema = z.object({
  jobName: z.string().min(1, { message: messages.fullNameIsRequired }),
  location: z.string().min(1, { message: messages.jobIsRequired }),
  // dob: z.date().refine((value) => value !== null, 'Please select a date'),
  // meetingSchedule: z
  //   .date()
  //   .refine((value) => value !== null, 'Please select a date'),
  jdFiles: z.array(z.instanceof(File)),
});

// generate form types from zod validation schema
export type CreateJobInput = z.infer<typeof createJobSchema>;
