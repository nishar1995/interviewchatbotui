'use client';
import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select } from 'rizzui';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (jobId: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
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
            aria-label={'ID'}
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="Job Id" />,
      onHeaderCell: () => onHeaderCellClick('jobId'),
      dataIndex: 'jobId',
      key: 'jobId',
      width: 130,
      render: (jobId: string) => <Text>#{jobId}</Text>,
    },
    {
      title: <HeaderCell title="Job Name" />,
      onHeaderCell: () => onHeaderCellClick('jobName'),
      dataIndex: 'jobName',
      key: 'jobName',
      width: 130,
      render: (jobName: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {jobName}
          </Text>
        </div>
      ),
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title={<span className="whitespace-nowrap">Date of Birth</span>}
    //     />
    //   ),
    //   dataIndex: 'dob',
    //   key: 'dob',
    //   width: 250,
    //   render: (dob: Date) => <DateCell date={dob} />,
    // },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Location</span>}
        />
      ),
      dataIndex: 'location',
      key: 'location',
      width: 130,
      render: (location: string) => (
        // <DateCell date={new Date(location)} />
        <span className="whitespace-nowrap">{location}</span>
      ),
    },
  ];


export const getColumnsData = () => {
  return [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            //checked={true}
            //onChange={handleSelectAll}
            //checked={checkedItems.length === data.length}
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
            aria-label={'ID'}
            className="cursor-pointer"
            
          //checked={checkedItems.includes(row.id)}
          //{...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="Job Id" />,
      //onHeaderCell: () => onHeaderCellClick('jobId'),
      dataIndex: 'jobId',
      key: 'jobId',
      width: 130,
      render: (jobId: string) => <Text>#{jobId}</Text>,
    },
    {
      title: <HeaderCell title="Job Name" />,
      //onHeaderCell: () => onHeaderCellClick('jobName'),
      dataIndex: 'jobName',
      key: 'jobName',
      width: 130,
      render: (jobName: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {jobName}
          </Text>
        </div>
      ),
    },

    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Location</span>}
        />
      ),
      dataIndex: 'location',
      key: 'location',
      width: 130,
      render: (location: string) => (
        // <DateCell date={new Date(location)} />
        <span className="whitespace-nowrap">{location}</span>
      ),
    },

  ];
};
