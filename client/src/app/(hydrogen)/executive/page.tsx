import { metaObject } from '@/config/site.config';
import ExecutiveDashboard from '../../modules/hr/pages/executive'

export const metadata = {
  ...metaObject('Executive Dashboard'),
};

export default function ExecutiveDashboardPage() {
  return <ExecutiveDashboard />;
}
