'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, Badge } from 'rizzui';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import { Customer, STATUS } from '@/data/recent-customers-data';
import { toCurrency } from '@/utils/to-currency';
import MasterCardIcon from '@/components/icons/mastercard';
import VisaIcon from '@/components/icons/visa';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

function getStatusBadge(status: Customer['status']) {
  switch (status) {
    case STATUS.Online:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case STATUS.Offline:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

export function getChartColorByEngagementRate(trafficShare: number) {
  if (trafficShare > 70) {
    return '#16a679';
  }
  if (trafficShare > 40) {
    return '#d89b0d';
  }
  return '#c5280c';
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="User ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    render: (_: any, row: Customer) => (
      <TableAvatar
        src={row.customer.avatar}
        name={row.customer.fullName}
        description={row.customer.email}
      />
    ),
  },
  {
    title: <HeaderCell title="Plan" />,
    dataIndex: 'plan',
    key: 'plan',
    width: 150,
    render: (plan: Customer['plan']) => (
      <Text className="font-medium text-gray-700">{plan}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="MRR"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'mrr'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('mrr'),
    dataIndex: 'mrr',
    key: 'mrr',
    width: 150,
    render: (mrr: number) => (
      <Text className="font-medium text-gray-700">{toCurrency(mrr)}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created At"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Payment Method" />,
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    width: 200,
    render: (paymentMethod: Customer['paymentMethod']) => (
      <Text className="flex items-center gap-3 font-medium text-gray-700">
        {paymentMethod.name === 'Visa' ? (
          <VisaIcon className="h-6 w-6" />
        ) : (
          <MasterCardIcon className="h-6 w-6" />
        )}
        *** {paymentMethod.cardNumber}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Status"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
        }
      />
    ),
    dataIndex: 'status',
    key: 'status',
    width: 140,
    onHeaderCell: () => onHeaderCellClick('status'),
    render: (status: Customer['status']) => getStatusBadge(status),
  },
  {
    title: <HeaderCell title="Activity" align="right" className="pe-4" />,
    dataIndex: 'chart',
    key: 'chart',
    width: 130,
    render: (chart: Customer['chart']) => (
      <div className="ms-auto h-8 w-64 pe-4 4xl:h-9">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chart}
            margin={{
              left: -30,
            }}
          >
            <Area
              type="bump"
              dataKey="activity"
              strokeWidth={1.8}
              fillOpacity={0.08}
              fill="#2465FF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    ),
  },
];
