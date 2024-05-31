import CandidateDashboardDetailsPage from '@/app/modules/candidate/pages/dashboard/candidate-details';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('candidate-details'),
};

export default function CandidateDashboardPage() {
  return <CandidateDashboardDetailsPage />;
}
