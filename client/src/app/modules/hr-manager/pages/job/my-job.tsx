'use client';
import MyJobTable from '../job/my-job-table';

export default function MyJob({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MyJobTable />
    </div>
  );
}
