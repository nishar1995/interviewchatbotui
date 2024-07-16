import { metaObject } from '@/config/site.config';
import ExecutiveDashboard from '../../modules/admin/pages/executive'

export const metadata = {
  ...metaObject('Executive Dashboard'),
};

export default function ExecutiveDashboardPage() {
  return <ExecutiveDashboard />;
}
