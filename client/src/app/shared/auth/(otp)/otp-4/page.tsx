import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import { Text } from 'rizzui';
import OtpForm from '@/app/auth/(otp)/otp-4/otp-form';

export default function OtpPage() {
  return (
    <AuthWrapperFour title="OTP Verification" className="md:px-14 lg:px-20">
      <Text className="pb-7 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-5">
        OTP has been sent to +*********12
      </Text>
      <OtpForm />
    </AuthWrapperFour>
  );
}
