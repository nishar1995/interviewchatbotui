import { metaObject } from '@/config/site.config';
import JobDashboard from '../../modules/hr-manager/pages/job'

export const metadata = {
  ...metaObject('Job Dashboard'),
};

export default function JobDashboardPage() {
  return <JobDashboard />;
}
