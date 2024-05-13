import cn from '@/utils/class-names';
import MyQuestions from './my-questions';


interface IndexProps {
  className?: string;
}

export default function ExecutiveQuestionsDashboard({ className }: IndexProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7',
        className
      )}
    >

      {<MyQuestions />}
     
    </div>
  );
}
