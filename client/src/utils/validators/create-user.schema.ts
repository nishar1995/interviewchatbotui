import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createUserSchema = z.object({
  // fullName: z.string().min(1, { message: messages.fullNameIsRequired }),
  // email: validateEmail,
  // role: z.string().min(1, { message: messages.roleIsRequired }),
  // permissions: z.string().min(1, { message: messages.permissionIsRequired }),
  // status: z.string().min(1, { message: messages.statusIsRequired }),

  first_name : z.string(),
  last_name : z.string(),
  username : z.string(),
  email : z.string(),
  role :z.string()
});

// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
