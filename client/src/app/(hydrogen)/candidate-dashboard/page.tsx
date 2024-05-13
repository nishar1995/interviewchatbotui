import CandidateDashboard from '../../modules/candidate/pages/dashboard'
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(),
};

export default function CandidateDashboardPage() {
  return <CandidateDashboard />;
}
