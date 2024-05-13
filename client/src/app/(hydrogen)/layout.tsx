'use client';

import { LAYOUT_OPTIONS } from '@/config/enums';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

import { useIsMounted } from '@/hooks/use-is-mounted';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import CarbonLayout from '@/layouts/carbon/carbon-layout';
import BoronLayout from '@/layouts/boron/boron-layout';

//should be same as in next auth options
export const hardcodedUsers = {
  admin: {
    email: 'admin@admin.com',
  },
  hrManager: {
    email: 'hr_manager@hrmanager.com',
  },
  hr: {
    email: 'hr@hr.com',
  },
  candidate: {
    email: 'candidate@candidate.com',
  },
} as const;

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  // if (layout === LAYOUT_OPTIONS.HELIUM) {
  //   return <HeliumLayout>{children}</HeliumLayout>;
  // }
  // if (layout === LAYOUT_OPTIONS.LITHIUM) {
  //   return <LithiumLayout>{children}</LithiumLayout>;
  // }
  // if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
  //   return <BerylLiumLayout>{children}</BerylLiumLayout>;
  // }
  // if (layout === LAYOUT_OPTIONS.BORON) {
  //   return <BoronLayout>{children}</BoronLayout>;
  // }
  // if (layout === LAYOUT_OPTIONS.CARBON) {
  //   return <CarbonLayout>{children}</CarbonLayout>;
  // }

  return <HydrogenLayout>{children}</HydrogenLayout>;
}
