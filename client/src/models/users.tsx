import { userEntitySchema } from "@/utils/validators/user-entity.schema";


// export const user = {
//   user_admin: userEntitySchema= {}
// }
export const user_admin: userEntitySchema = {
  tenant_user_id: 1,
  username: "admin@123",
  roles: ({
    id: 1,
    role: "admin"
  }),
  role: 1,
  user_email_id: "admin@admin.com",
  active: true,
  updated_by: "abc",
  tenant_id: 1,
  store_id: 1,
  created_date: new Date("08-05-2024"),
  last_updated_date: new Date("08-05-2024")
}

export const user_hr_manager: userEntitySchema = {
  tenant_user_id: 2,
  username: "hrManager@123",
  roles: ({
    id: 2,
    role: "hr_manager"
  }),
  role: 2,
  user_email_id: "hr_manager@hrmanager.com",
  active: true,
  updated_by: "abc",
  tenant_id: 2,
  store_id: 2,
  created_date: new Date("08-05-2024"),
  last_updated_date: new Date("08-05-2024")
}
export const user_hr: userEntitySchema = {
  tenant_user_id: 3,
  username: "hr@123",
  roles: ({
    id: 3,
    role: "hr"
  }),
  role: 3,
  user_email_id: "hr@hr.com",
  active: true,
  updated_by: "abc",
  tenant_id: 3,
  store_id: 3,
  created_date: new Date("08-05-2024"),
  last_updated_date: new Date("08-05-2024")
}

export const user_candidate: userEntitySchema = {
  tenant_user_id: 4,
  username: "candidate@123",
  roles: ({
    id: 4,
    role: "candidate"
  }),
  role: 4,
  user_email_id: "candidate@candidate.com",
  active: true,
  updated_by: "abc",
  tenant_id: 4,
  store_id: 4,
  created_date: new Date("08-05-2024"),
  last_updated_date: new Date("08-05-2024")
}

// admin: {
//     email: 'admin@admin.com',
//     password: 'admin',
//   },
//   hrManager: {
//     email: 'hr_manager@hrmanager.com',
//     password: 'hr_manager',
//   },
//   hr: {
//     email: 'hr@hr.com',
//     password: 'hr_user',
//   },
//   candidate: {
//     email: 'candidate@candidate.com',
//     password: 'candidate_user',
//   },