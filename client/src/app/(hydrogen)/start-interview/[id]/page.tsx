import StartInterviewDashboard from '@/app/modules/admin/pages/start-interview';
import { metaObject } from '@/config/site.config';
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  return metaObject(`Interview ${id}`);
 
}

export default function StartInterview({params}:any) {
  return (
    <>
    <StartInterviewDashboard id={params.id}/>
    </>

  )
  
}




/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */



