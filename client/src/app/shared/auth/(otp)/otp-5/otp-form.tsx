'use client';

import { Button, PinCode } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';

type FormValues = {
  otp: string;
};

export default function OtpForm() {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <Form<FormValues> onSubmit={onSubmit} className="w-full">
      {({ setValue }) => (
        <div className="space-y-5 lg:space-y-7">
          <PinCode
            variant="outline"
            className="lg:justify-start"
            size="lg"
            setValue={(value) => setValue('otp', String(value))}
          />
          <div className="grid grid-cols-1 gap-5 pt-3 sm:grid-cols-2">
            <Button
              className="w-full"
              type="submit"
              size="xl"
              variant="outline"
            >
              Resend OTP
            </Button>
            <Button className="w-full" type="submit" size="xl">
              Verify OTP
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}
