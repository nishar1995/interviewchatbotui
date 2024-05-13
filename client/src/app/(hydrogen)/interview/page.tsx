import AppointmentDashboard from '../../modules/hr-manager/pages/appointment/dashboard'
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Interview'),
};

export default function AppointmentPage() {
  return <AppointmentDashboard />;
}
