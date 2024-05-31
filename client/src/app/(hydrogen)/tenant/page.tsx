import { metaObject } from '@/config/site.config';
import TenantDashboard from '../../modules/admin/pages/tenant'; // Import the 'TenantDashboard' component


export const metadata = {
  ...metaObject('tenant Dashboard'),
};

export default function TenantPage() {
  return <TenantDashboard />;
}
