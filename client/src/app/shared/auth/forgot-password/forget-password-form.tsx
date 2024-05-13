'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Text, Input, Password } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/utils/validators/reset-password.schema';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

import { forgotPassword } from '@/services/authService';

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});

  // const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
  //   console.log(data);
  //   setReset(initialValues);
  // };

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    try {
      const response = await forgotPassword(data)
      console.log(data);
      console.log("forgot password response", response)
      setReset(initialValues);
    } catch (error) {
      console.log("not update the password")
    }

  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
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
            <Button className="mt-2 w-full" type="submit" size="lg">
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
