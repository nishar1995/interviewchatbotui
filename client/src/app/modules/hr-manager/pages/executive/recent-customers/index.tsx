import { recentCustomers } from '@/data/recent-customers-data';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { getColumns } from '@/app/shared/executive/recent-customers/columns';

export default function RecentCustomers({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title="Recent Customers"
      data={recentCustomers}
      //@ts-ignore
      getColumns={getColumns}
      className={className}
      enablePagination
      noGutter
      searchPlaceholder="Search for customer..."
      variant="modern"
    />
  );
}
