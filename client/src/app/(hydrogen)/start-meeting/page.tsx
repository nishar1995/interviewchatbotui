import { metaObject } from '@/config/site.config';
import ExecutiveMeetingDashboard from '@/app/modules/hr/pages/schedule-meeting/meeting-index'


export const metadata = {
  ...metaObject('Meeting'),
};

export default function StartMeetingPage() {
  return <ExecutiveMeetingDashboard />;
}
