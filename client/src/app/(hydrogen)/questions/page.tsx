import { metaObject } from '@/config/site.config';
import QuestionsDashboard from '../../modules/hr/pages/questions'; // Import the QuestionsDashboard component



export const metadata = {
  ...metaObject('questions Dashboard'),
};

export default function QuestionsPage() {
  return <QuestionsDashboard />;
}
