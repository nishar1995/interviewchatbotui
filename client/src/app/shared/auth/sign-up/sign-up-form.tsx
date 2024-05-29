'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import { registration } from '@/services/authService';
import { useRouter } from 'next/navigation';

const initialValues: SignUpSchema = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  isAgreed: false,
  role: 3

};

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const router = useRouter();
  // const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
  //   console.log(data);
  //   setReset({ ...initialValues, isAgreed: false });
  // };
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      console.log(data);
      const response = await registration(data);
      console.log("response..", response);
      if(response){
        setReset({ ...initialValues, isAgreed: false });
        routes.auth.signIn
        router.push("/shared/auth/signin");
      } 
     
    } catch (error) {
      console.log("not register", error)
    }
  };
  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
              size="lg"
              label="First Name"
              placeholder="Enter your first name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('first_name')}
              error={errors.first_name?.message}
            />
            <Input
              type="text"
              size="lg"
              label="Last Name"
              placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('last_name')}
              error={errors.last_name?.message}
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="text"
              size="lg"
              label="User Name"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Enter your username"
              {...register('username')}
              error={errors.username?.message}
            />

            {/* <select
              aria-label='role'
              id="role"
              className="col-span-full border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('role', { required: 'Role is required' })}>
              <option value="">Select a role</option>
              <option value="1">Admin</option>
              <option value="2">Hr Manager</option>
              <option value="3">Hr</option>
              <option value="4">Candidate</option>

            </select> */}
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <div className="col-span-2 flex items-start ">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    By signing up you have agreed to our{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
              />
            </div>
            <Button size="lg" type="submit" className="col-span-2 mt-2">
              <span>Get Started</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
