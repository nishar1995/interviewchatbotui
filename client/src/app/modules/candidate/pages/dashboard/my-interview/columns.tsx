'use client';

import { HeaderCell } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { PiCheckCircleBold, PiClockBold } from 'react-icons/pi';
import { Text, Checkbox, Select, Tooltip, ActionIcon } from 'rizzui';
import { deleteTenant, fetchData } from '../../../../../../services/tenantService'
import 'react-datepicker/dist/react-datepicker.css';
import { useModal } from '@/app/shared/modal-views/use-modal';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import CreateApplication from '../../../../admin/pages/tenant/add-tenant/create-application'

import PencilIcon from '@/components/icons/pencil';
import { routes } from '@/config/routes';
import VideoIcon from '@/components/icons/video-solid'




export const getColumnsData = ({interviewDetails}:any) => {
  console.log("interView Details.........",interviewDetails)
  return [
    {
      title: <HeaderCell title="Application Id" />,
      //onHeaderCell: () => onHeaderCellClick('applicationId'),
      dataIndex: 'application_id',
      key: 'application_id',
      width: 130,
      render: (application_id: string) => <Text>{application_id}</Text>,
    },
    
    {
      title: <HeaderCell title="Job Title" />,
      //onHeaderCell: () => onHeaderCellClick('passWord'),
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
    //   title: <HeaderCell title="User Name" />,
    //   //onHeaderCell: () => onHeaderCellClick('passWord'),
    //   dataIndex: 'username',
    //   key: 'username',
    //   width: 150,
    //   render: (
    //     username: string) => (
    //     <div>
    //       <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //         {username}
    //       </Text>
    //     </div>
    //   ),
    // },
    {
      title: <HeaderCell title="Meeting Id" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'meeting_id',
      key: 'meeting_id',
      width: 150,
      render: (meeting_id: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {meeting_id}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Password" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'password',
      key: 'password',
      width: 150,
      render: (password: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {password}
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
        <RenderAction row={id}  />
      ),
    },

  ];
};


function RenderAction({
  row,
  
}: {
  row: any;
  
}) {
  const onClickMeeting = (id:any) => {
    console.log("start Meeting",id);
    //router.push(`/start-meeting/${id}`);
    // window.open(`/start-meeting/${id}`, '_blank');
    window.open(`/start-interview/${id}`, '_blank');
  }
  
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'Start Interview'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Start Interview'}
          onClick={() => onClickMeeting(row.id)
          }
          className="hover:!border-gray-900 hover:text-gray-700"
        >
          <VideoIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      
    </div>
  );
}