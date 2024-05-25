'use client';

import { HeaderCell } from '@/components/ui/table';
import { useState } from 'react';
import { PiCheckCircleBold, PiClockBold } from 'react-icons/pi';
import { Text, Checkbox, Select, Tooltip, ActionIcon } from 'rizzui';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateApplication from './create-application';
import StartMeeting from '../../../../hr/pages/schedule-meeting/start-meeting/zoom-meeting-sdk'
import { deleteMeeting } from '@/services/meetingScheduleService';
import PencilIcon from '@/components/icons/pencil';
import VideoIcon from '@/components/icons/video-solid'
import { routes } from '@/config/routes';

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
      title: <HeaderCell title="Questions Id" />,
      onHeaderCell: () => onHeaderCellClick('questionsId'),
      dataIndex: 'questionsId',
      key: 'questionsId',
      width: 150,
      render: (questionsId: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {questionsId}
          </Text>
        </div>
      ),
    },

    {
      title: <HeaderCell title="Start Meeting" />,
      onHeaderCell: () => onHeaderCellClick('startMeeting'),
      dataIndex: 'start_time',
      key: 'start_time',
      width: 150,
      render: (start_time: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {start_time}
          </Text>
        </div>
      ),
    },

    {
      title: <HeaderCell title="Interview Period Time" />,
      onHeaderCell: () => onHeaderCellClick('interviewPeriodTime'),
      dataIndex: 'interviewPeriodTime',
      key: 'interviewPeriodTime',
      width: 150,
      render: (interviewPeriodTime: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {interviewPeriodTime}
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
export const getColumnsData = ({ handlePopupClose, onDeleteItem }: any) => {
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
    // {
    //   title: <HeaderCell title="Tenant Id" />,
    //   //onHeaderCell: () => onHeaderCellClick('tenantId'),
    //   dataIndex: 'tenant_id',
    //   key: 'tenant_id',
    //   width: 130,
    //   render: (tenant_id: string) => <Text>#{tenant_id}</Text>,
    // },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Application Id</span>}
        />
      ),
      dataIndex: 'application_id',
      key: 'application_id',
      width: 130,
      render: (application_id: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {application_id}
          </Text>
        </div>
      ),
    },


    {
      title: <HeaderCell title="Job Title" />,
      //onHeaderCell: () => onHeaderCellClick('questionsId'),
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

    {
      title: <HeaderCell title="Start Meeting" />,
      //onHeaderCell: () => onHeaderCellClick('startMeeting'),
      dataIndex: 'start_time',
      key: 'start_time',
      width: 150,
      render: (start_time: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {/* {moment(start_time).format('DD-MM-YYYY, h:mm a')} */}
            {moment(start_time).format("DD-MM-YYYY, h:mm a")}
          </Text>
        </div>
      )
    },


    {
      title: <HeaderCell title="End Meeting" />,
      //onHeaderCell: () => onHeaderCellClick('interviewPeriodTime'),
      dataIndex: 'end_time',
      key: 'end_time',
      width: 150,
      render: (end_time: string) => (

        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {moment(end_time).format("DD-MM-YYYY, h:mm a")}
          </Text>
        </div>
      ),
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
const handlePopupClose = () => {
  console.log("close update popup");

}


const onClickMeeting = () => {
  console.log("start Meeting")
  routes.meeting.startMeeting
}


function setOpen() {
  useModal().closeModal
}


function RenderAction({
  row,
  onDeleteItem,
  onPopupClose
}: {
  row: any;
  onDeleteItem: (id: string) => void;
  onPopupClose: () => void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal(row: any) {
    console.log("row////////", row)
    closeModal(),
      openModal({
        view: <CreateApplication onClose={onPopupClose} meetingDetails={row} />,
        //customSize: '500px',
      });
  }
  // className="w-full @lg:w-auto "
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'Edit Meeting'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Meeting'}
          // className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <CreateApplication
                  meetingDetails={row}
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

      <Tooltip
        size="sm"
        content={'Start Meeting'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Start Meeting'}
          onClick={() => onClickMeeting()
            // openModal({
            //   view: (
            //     <StartMeeting
            //       // meetingDetails={row}
            //       // data={row}
            //       onEdit={handleCreateModal(row)
            //       }
            //       onClose={onPopupClose}
            //     />
            //   ),
            //   customSize: '900px',
            // })
          }
          className="hover:!border-gray-900 hover:text-gray-700"
        >
          <VideoIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <DeletePopover
        title={`Delete the Schedule Meetting`}
        description={`Are you sure you want to delete this Schedule Meeting?`}
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
