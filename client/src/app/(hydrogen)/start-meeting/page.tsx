import { metaObject } from '@/config/site.config';
import ExecutiveMeetingDashboard from '@/app/modules/hr/pages/schedule-meeting/meeting-index'


export const metadata = {
  ...metaObject('Meeting'),
};

export default function StartMeetingPage() {
  return <ExecutiveMeetingDashboard />;
}


// type Props = {
//   params: { id: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const id = params.id;

//   return metaObject(`${id}`);
// }