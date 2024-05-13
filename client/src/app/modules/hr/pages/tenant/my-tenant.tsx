'use client';

import MyTenantTable from "./add-tenant";


export default function MyTenant({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MyTenantTable />
    </div>
  );
}
