'use client';

import { Button, PinCode } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';

type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-10">
          <PinCode
            variant="outline"
            setValue={(value) => setValue('otp', String(value))}
            size="lg"
            className="lg:justify-start"
          />
          <Button
            className="w-full text-base font-medium"
            type="submit"
            size="lg"
          >
            Verify OTP
          </Button>
          <div className="">
            <Button
              className="-mt-4 w-full p-0 text-base font-medium text-primary underline lg:inline-flex lg:w-auto"
              type="submit"
              variant="text"
            >
              Resend OTP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}
