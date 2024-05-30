'use client';

import { HeaderCell } from '@/components/ui/table';
import { useState } from 'react';
import { PiCheckCircleBold, PiClockBold } from 'react-icons/pi';
import { Text, Checkbox, Select, Tooltip, ActionIcon } from 'rizzui';

import 'react-datepicker/dist/react-datepicker.css';
import CreateApplication from '../../../../hr/pages/executive/my-applications-table/create-application';
import { useModal } from '@/app/shared/modal-views/use-modal';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import AppointmentDetails from '@/app/modules/hr-manager/pages/appointment/appointment-list/list/appointment-details';
import { deleteCandidate } from '@/services/candidateService';
import { candidateList } from '../../../../../../services/candidateService';
import PencilIcon from '@/components/icons/pencil';
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
function StatusSelect({ selectItem = 'Waiting' }: { selectItem?: string }) {
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

// const generateApplicationId = (id: string) => {
//   let data = `AiInfox-${id.padStart(5, '0')}`;
//   console.log("Generated Application ID:", data);
//   return data;
// };
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
      title: <HeaderCell title="Application Id" />,
      onHeaderCell: () => onHeaderCellClick('applicationId'),
      dataIndex: 'applicationId', // Make sure this matches your data structure
      key: 'applicationId',
      width: 130,
      render: (applicationId:any) => <Text>{applicationId}</Text>
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

export function handleSelectAll() {
  console.log("handle select all")
}

export async function onDeleteItem(id: any) {
  console.log("candidate id", id)
  console.log("delete the candidate......");
  try {
    const response = await deleteCandidate(id);
    if (response) {
      console.log("delete the candidate", response);
      SetOpen()
    }
  } catch (error) {
    console.log("error", error)
  }

}
export const getColumnsData = ({ handlePopupClose, onDeleteItem }: any) => {
  return [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={true}
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
          // {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="Application Id" />,
      //onHeaderCell: () => onHeaderCellClick('applicationId'),
      dataIndex: 'application_id',
      key: 'application_id',
      width: 130,
      render: (application_id: string) => <Text>{application_id}</Text>,
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
      title: <HeaderCell title="Candidate Name" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (name: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {name}
          </Text>
        </div>
      ),
    },

    {
      title: <HeaderCell title="Job Title" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'job_title',
      key: 'job_title',
      width: 150,
      render: (job_title: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {job_title}
          </Text>
        </div>
      ),
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title={<span className="whitespace-nowrap">Meeting Schedule</span>}
    //     />
    //   ),
    //   dataIndex: 'meetingSchedule',
    //   key: 'meetingSchedule',
    //   width: 130,
    //   render: (meetingSchedule: string) => (
    //     <div>
    //       <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //         {meetingSchedule}
    //       </Text>
    //     </div>
    //   ),
    // },
    {
      title: (
        <HeaderCell
          title="Status"
          sortable
        // ascending={
        //   sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
        // }
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 260,
      //onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: string) => {
        return <StatusSelect selectItem={status} />;
      },
    },
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, id: any) => (
        <RenderAction row={id} onDeleteItem={onDeleteItem} onPopupClose={handlePopupClose} />
      ),
    },
  ];
};

const fetchCandidateList = async () => {
  const response = await candidateList();
  console.log("fetch data", response);
  
}
const handlePopupClose = () => {
  console.log("close update popup");
  fetchCandidateList();
}

function RenderAction({
  row,
  onDeleteItem,
  onPopupClose
}: {
  row: any;
  onDeleteItem: (id: string) => void;
  onPopupClose:()=>void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal(row: any) {
    console.log("row////////", row)
    closeModal(),
      openModal({
        view: <CreateApplication onClose={onPopupClose} candidateList={row} />,
        //customSize: '500px',
      });
  }
  // className="w-full @lg:w-auto "
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'Edit Candidate'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Candidate'}
          // className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <CreateApplication
                  candidateList={row}
                  data={row}
                  onDelete={() => onDeleteItem(row.id)}
                  onEdit={handleCreateModal(row)
                  }
                  onClose={onPopupClose}
                />
              ),
              customSize: '900px',
            })
          }
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <DeletePopover
        title={`Delete the Candidate`}
        description={`Are you sure you want to delete this  candidate?`}
        onDelete={() => onDeleteItem && onDeleteItem(row.id)}
      />
    </div>
  );
}




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
function SetOpen() {
  useModal().closeModal
}

