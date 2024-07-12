

import ScheduleMeeting from '@/app/modules/admin/pages/schedule-meeting';
import { metaObject } from '@/config/site.config';
// import ScheduleMeeting from '@/app/shared/schedule-meeting';

export const metadata = {
  ...metaObject('Schedule Meeting'),
};

export default function ScheduleMeetingDashboardPage() {
  return <ScheduleMeeting />;
}
