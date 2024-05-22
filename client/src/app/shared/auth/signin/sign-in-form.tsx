'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';
import { UserRole } from '@/enums/role';

const initialValues: LoginSchema = {
  // email: 'admin@admin.com',
  // password: 'admin',
  // rememberMe: true,
  username: '',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});
  const router = useRouter();

  // const onSubmit: SubmitHandler<LoginSchema> = (data) => {
  //   console.log(data);
  //   console.log("//",routes.fileManager.dashboard)
  // redirect(routes.fileManager.dashboard);
  //   signIn('credentials', {
  //     ...data,
  //   });
  // };
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const response: any = await login(data);
      console.log("login response",response);
      Cookies.set('user_details', JSON.stringify(response));
      Cookies.set('token', JSON.stringify(response.access));
      console.log("sign in ", data);
      
      switch (Number(response.role)) {
        case UserRole.ADMIN:
          router.push("/file-manager");
          break;
        case UserRole.HR_MANAGER:
          router.push("/interview");
          break;
        case UserRole.HR:
          router.push("/file-manager");
          break;
        case UserRole.CANDIDATE:
          router.push("/candidate-dashboard");
          break;
        default:
          console.log("Unhandled role:", response.role);
          router.push("/not-found")
          break;
      }
    } catch (error) {
      console.log("///////", error);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('username')}
              error={errors.username?.message}
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
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg">
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
