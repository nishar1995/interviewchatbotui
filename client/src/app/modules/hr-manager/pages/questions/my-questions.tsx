'use client';

import MyQuestionsTable from "./add-questions";

export default function MyQuestions({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MyQuestionsTable />
    </div>
  );
}
