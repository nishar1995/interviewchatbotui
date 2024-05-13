import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import { Text } from 'rizzui';
import OtpForm from '@/app/auth/(otp)/otp-2/otp-form';

export default function OtpPage() {
  return (
    <AuthWrapperTwo title="Validation">
      <div className="max-w-md xl:pe-7">
        <Text className="-mt-1 mb-9 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:text-start xl:-mt-3">
          We have sent you One Time Password to your email. Please enter your
          OTP
        </Text>
        <OtpForm />
      </div>
    </AuthWrapperTwo>
  );
}
