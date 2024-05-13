'use client';

import { HeaderCell } from '@/components/ui/table';
import { useState } from 'react';
import { PiCheckCircleBold, PiClockBold } from 'react-icons/pi';
import { Text, Checkbox, Select } from 'rizzui';

import 'react-datepicker/dist/react-datepicker.css';
// const parseMeetingSchedule = (scheduleString: string | undefined): Date | null => {
//   // Check if scheduleString is null or undefined
//   if (scheduleString === null || scheduleString === undefined) {
//     return null;
//   }

//   // Split the string by space and comma
//   const parts = scheduleString.split(/[\s,]+/);
//   if (parts.length < 3) {
//     return null; // Ensure there are enough parts to extract day, month, and time
//   }
//   // Extract day, month, year, and time
//   const day = parseInt(parts[0]);
//   const monthName = parts[1];
//   const year = new Date().getFullYear(); // Assuming current year
//   const time = parts[2];
//   // Convert month name to month index (0-indexed)
//   const monthIndex = new Date(Date.parse(monthName + ' 1, 2000')).getMonth();
//   // Extract hour and minute from time
//   const [hour, minute] = time.split(':').map(part => parseInt(part));
//   // Create a new Date object
//   return new Date(year, monthIndex, day, hour, minute);
// };
// const parseMeetingSchedule = (scheduleString: string | undefined): Date | null => {
//   // Check if scheduleString is null or undefined
//   if (scheduleString === null || scheduleString === undefined) {
//     return null;
//   }

//   // Define known date formats to try parsing
//   const dateFormats = [
//     // Add more formats if needed
//     'D MMMM,YY h:mma', // e.g., "11 April,24 6:00PM"
//     'MM/DD/YYYY h:mm A', // e.g., "04/11/2024 6:00 PM"
//     'YYYY-MM-DDTHH:mm:ss', // e.g., "2024-04-11T18:00:00"
//   ];

//   // Attempt to parse the date using each format
//   for (const format of dateFormats) {
//     const parsedDate = parseDateWithFormat(scheduleString, format);
//     if (parsedDate !== null) {
//       return parsedDate;
//     }
//   }

//   // If none of the formats work, return null
//   return null;
// };

// const parseDateWithFormat = (dateString: string, format: string): Date | null => {
//   const parsedDate = new Date(dateString.replace(/,/g, ''));
//   return isNaN(parsedDate.getTime()) ? null : parsedDate;
// };


const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Completed', value: ' Completed' },
  { label: 'Scheduled', value: 'Scheduled' },
];
function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.label === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      inPortal={false}
      placeholder="Status"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}
function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Scheduled':
      return (
        <div className="flex items-center">
          <PiClockBold className="shrink-0 fill-green-dark text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-orange text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (applicationId: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  selectedDateRange: [Date, Date];
  // starRangeDate: Date;
  // endRangeDate: Date;

};


export const getColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
  selectedDateRange,
  // starRangeDate, 
  // endRangeDate,
  // meetingScheduleOptions: [
  //   { label: 'Waiting', value: 'waiting' },
  //   { label: 'Scheduled', value: 'scheduled' }
  // ],
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
      title: <HeaderCell title="Tenant Id" />,
      onHeaderCell: () => onHeaderCellClick('tenantId'),
      dataIndex: 'tenantId',
      key: 'tenantId',
      width: 130,
      render: (tenantId: string) => <Text>#{tenantId}</Text>,
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Job Id</span>}
        />
      ),
      dataIndex: 'jobId',
      key: 'jobId',
      width: 130,
      render: (jobId: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {jobId}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Questions" />,
      onHeaderCell: () => onHeaderCellClick('questions'),
      dataIndex: 'questions',
      key: 'questions',
      width: 150,
      render: (questions: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {questions}
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
   
    //   render: (meetingSchedule: string | undefined)=> {
    //     // Ensure meetingSchedule is a Date object
    //     if (meetingSchedule === null || meetingSchedule === undefined) {
    //       return null;
    //     }
    //     const parsedMeetingSchedule = parseMeetingSchedule(meetingSchedule);

    //     return (
    //       <div>
    //         <time className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //         {parsedMeetingSchedule?.toLocaleString() ?? 'Invalid Date'}
    //         </time>
    //       </div>
    //     );
    //   },
    // },





    //     render: (meetingSchedule: Date) => (
    //       <div>
    //         {/* <> {console.log(meetingSchedule)} </> */}

    //         <time className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //         {meetingSchedule.toLocaleDateString()}
    //         </time>
    //          {/* <time className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //             {`${selectedDateRange[0].toLocaleDateString()} - ${selectedDateRange[1].toLocaleDateString()}`}
    //            </time> */}
    //           {/* <time className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //   {starRangeDate && endRangeDate && `${starRangeDate.toLocaleDateString()} - ${endRangeDate.toLocaleDateString()}`}
    // </time> */}
    //       </div>
    //     ),
    //  },


    
  ];


// const [selectAllChecked, setSelectAllChecked] = useState(true);
// setSelectAllChecked(!selectAllChecked);
export function handleSelectAll() {
  console.log("handle select all")
}
export const getColumnsData = () => {
  return [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
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
      title: <HeaderCell title="Tenant Id" />,
      //onHeaderCell: () => onHeaderCellClick('tenantId'),
      dataIndex: 'tenantId',
      key: 'tenantId',
      width: 130,
      render: (tenantId: string) => <Text>#{tenantId}</Text>,
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Job Id</span>}
        />
      ),
      dataIndex: 'jobId',
      key: 'jobId',
      width: 130,
      render: (jobId: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {jobId}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Questions" />,
      //onHeaderCell: () => onHeaderCellClick('questions'),
      dataIndex: 'questions',
      key: 'questions',
      width: 150,
      render: (questions: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {questions}
          </Text>
        </div>
      ),
    },
   
  ];
};
export const getColumns2 = ({
  handleSelectAll,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
  sortConfig,
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
      title: <HeaderCell title="Application Id" />,
      onHeaderCell: () => onHeaderCellClick('applicationId'),
      dataIndex: 'applicationId',
      key: 'applicationId',
      width: 130,
      render: (applicationId: string) => <Text>#{applicationId}</Text>,
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">username</span>}
        />
      ),
      dataIndex: 'username',
      key: 'username',
      width: 130,
      render: (username: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {username}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="password" />,
      onHeaderCell: () => onHeaderCellClick('passWord'),
      dataIndex: 'password',
      key: 'password',
      width: 150,
      render: (passWord: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {passWord}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Candidate Name" />,
      onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'candidateName',
      key: 'candidateName',
      width: 150,
      render: (candidateName: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {candidateName}
          </Text>
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Meeting Schedule</span>}
        />
      ),
      dataIndex: 'meetingSchedule',
      key: 'meetingSchedule',
      width: 130,
      render: (meetingSchedule: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {meetingSchedule}
          </Text>
        </div>
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
      width: 260,
      onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: string) => {
        return <StatusSelect selectItem={status} />;
      },
    },
  ];
