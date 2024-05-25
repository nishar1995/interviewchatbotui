'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import {
  CreateUserInput,
  createUserSchema,
} from '@/utils/validators/create-user.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  permissions,
  roles,
  statuses,
} from '@/app/shared/roles-permissions/utils';
import { UserRole } from '@/enums/role';
import { ROLES } from '@/config/constants';
import { updateUser } from '@/services/userService';
export default function CreateUser({ onClose, userDetails }: any) {
  const defaultValues: CreateUserInput = {
    first_name: userDetails?.first_name || '',
    last_name: userDetails?.last_name || '',
    email: userDetails?.email || '',
    username: userDetails?.username || '',
    role: userDetails?.role || '',
  }

  console.log("usrDetails......", userDetails)
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);



  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    // set timeout ony required to display loading state of the create category button
    // const formattedData = {
    //   ...data,
    //   createdAt: new Date(),
    // };
    // setLoading(true);
    // setTimeout(() => {
    //   console.log('formattedData', formattedData);
    //   setLoading(false);
    //   setReset({
    //     fullName: '',
    //     email: '',
    //     role: '',
    //     permissions: '',
    //     status: '',
    //   });
    //   closeModal();
    // }, 600);


    setLoading(true);
    if (userDetails) {
      try {
        const response = await updateUser(userDetails.id, data);
        if (response) {
          console.log(response);
          setLoading(false);
          setReset({
            ...defaultValues,
          });
          closeModal();
          onClose();
        }
      } catch (error) {
        console.log("error", error)
        setLoading(false);

      }
    }
  };

  const roles = Object.entries(ROLES).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return (
    <Form<CreateUserInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createUserSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {userDetails ? 'Update User' : 'Add a new User'}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="First Name"
              placeholder="Enter user's First name"
              defaultValue={defaultValues.first_name}
              {...register('first_name')}
              className="col-span-full"
              error={errors.first_name?.message}
            />

            <Input
              label="Last Name"
              placeholder="Enter user's Last name"
              {...register('last_name')}
              defaultValue={defaultValues.last_name}
              className="col-span-full"
              error={errors.last_name?.message}
            />

            <Input
              label="Email"
              placeholder="Enter user's Email Address"
              className="col-span-full"
              defaultValue={defaultValues.email}
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="User Name"
              placeholder="Enter user's Username"
              className="col-span-full"
              defaultValue={defaultValues.username}
              {...register('username')}
              error={errors.username?.message}
            />

            {/* <Controller
            name="role"
            control={control}
            render={({ field: { name, onChange, value } }) => (
              <Select
                options={roles}
                value={value}
                onChange={onChange}
                name={name}
                label="Role"
                className="col-span-full"
                error={errors?.status?.message}
                getOptionValue={(option) => option.value}
                displayValue={(selected: string) =>
                  roles.find((option: any) => option.value === selected)?.label ??
                  selected
                }
                dropdownClassName="!z-[1]"
                inPortal={false}
              />


            )}
          /> */}

            <select
              // label="Role"
              className="col-span-full"
              //value={value} 
              {...register('role', { required: 'Role is required' })}
              defaultValue={defaultValues.role}>
              <option value="">Select a Role</option>
              <option value="1">ADMIN</option>
              <option value="2">HR_MANAGER</option>
              <option value="3">HR</option>
              <option value="4">CANDIDATE</option>
            </select>


            <div className="col-span-full flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                {userDetails ? 'Update User' : 'Creat User'}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
