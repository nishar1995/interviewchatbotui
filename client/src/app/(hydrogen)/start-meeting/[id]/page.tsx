import { metaObject } from "@/config/site.config";
import { Metadata } from "next";
import ExecutiveMeetingDashboard from '@/app/modules/hr/pages/schedule-meeting/meeting-index'


type Props = {
  params: { id: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  return metaObject(`Message ${id}`);
  // return metaObject(`Edit ${id}`);
}

// export default function StartMeetingPage({ params }: any) {
//   return (
//     <>
//       <CreateOrder id={params.id} order={orderData} />
//     </>
//   );
// }
export default function StartMeetingPage({params} :any) {
  return (
    <>
    <ExecutiveMeetingDashboard id={params.id}/>
    </>

  )
}