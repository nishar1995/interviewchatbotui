'use client';

import MyTenantTable from "../../pages/tenant/add-tenant";


export default function MyTenant({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MyTenantTable />
    </div>
  );
}
