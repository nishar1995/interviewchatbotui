import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createApplicationSchema = z.object({
  name: z.string().min(1, { message: messages.fullNameIsRequired }),
  job_id: z.string().min(1, { message: messages.jobIsRequired }),
  meetingSchedule: z.string().min(1, { message: messages.meetingScheduleIsRequired }),
  // dob: z.date().refine((value) => value !== null, 'Please select a date'),
  // meetingSchedule:z.date().refine((value) => value !== null, {
  //   message: messages.meetingScheduleIsRequired,
  // }),
  
  
  // z.date({
  //   required_error: messages.meetingScheduleIsRequired,
  // }),
  //   .date()
  //   .refine((value) => value !== null, 'Please select a date'),
  resume: z.array(z.instanceof(File)),
 // Add username and password fields
  username: z.string().min(1, { message: 'Username is required' }),
  // passWord: z.string().min(1, { message: 'Password is required' }),


});

// generate form types from zod validation schema
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
