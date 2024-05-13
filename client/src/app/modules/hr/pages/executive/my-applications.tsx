'use client';

import { Title } from 'rizzui';
import MyApplicationsTable from './my-applications-table';

export default function MyApplications({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MyApplicationsTable />
    </div>
  );
}
