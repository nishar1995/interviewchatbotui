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
import Cookies from 'js-cookie';



export const getColumnsData = ({candidateDetails}:any) => {
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
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Name</span>}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 130,
      render: (name: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {name}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Phone Number" />,
      //onHeaderCell: () => onHeaderCellClick('passWord'),
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 150,
      render: (phone_number: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {phone_number}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="User Name" />,
      //onHeaderCell: () => onHeaderCellClick('passWord'),
      dataIndex: 'username',
      key: 'username',
      width: 150,
      render: (
        username: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {username}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Job" />,
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
    {
      title: <HeaderCell title="Email" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'email',
      key: 'email',
      width: 150,
      render: (email: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {email}
          </Text>
        </div>
      ),
    },


  ];
};










