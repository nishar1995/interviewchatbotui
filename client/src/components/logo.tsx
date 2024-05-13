interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}
import LogoImage from '@public/company-logo.jpg';
import Image from 'next/image';

export default function Logo({ ...props }: IconProps) {
  return <Image src={LogoImage} alt="company_logo" priority />;
}
