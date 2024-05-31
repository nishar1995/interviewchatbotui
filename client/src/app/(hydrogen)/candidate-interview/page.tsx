import CandidateInterviewDashboard from '@/app/modules/candidate/pages/dashboard/my-interview';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('interview'),
};

export default function CandidateDashboardDetails() {
  return <CandidateInterviewDashboard />;
}
