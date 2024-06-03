import StartInterviewDashboard from '@/app/modules/admin/pages/start-interview';
import { metaObject } from '@/config/site.config';


export const metadata = {
  ...metaObject('interview Dashboard'),
};

export default function StartInterview() {
  return <StartInterviewDashboard />;
}
