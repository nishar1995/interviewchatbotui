import FileDashboard from '../../modules/hr/pages/file/dashboard'
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <FileDashboard />;
}
