'use client';

import WidgetCard from '@/components/cards/widget-card';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { getColumns, getColumnsData } from './columns';
import ModalButton from '@/app/shared/modal-button';
import CreateApplication from './create-application';
import { useQuery } from '@tanstack/react-query';
import { getMeetingScheduleList } from '../../../../../../services/meetingScheduleService'

import CreateMeeting from '../../schedule-meeting/my-schedule-meeting/create-application'


export const meetingQueryKey = 'meeting-application-data';
export default function MyMeetingTable({
}: {
    // Add return type annotation here
  }) {
  const columns = getColumnsData();
  const [pageSize, setPageSize] = useState(7);
  const { visibleColumns } = useColumn(columns);
  const [data, setData] = useState<any>([]);


  useEffect(() => {
    fetchMeetingList();
  }, []);

  const fetchMeetingList = async () => {
    const response = await getMeetingScheduleList();
    console.log("fetch data", response);
    setData(response.data)
  }
  const handlePopupClose = () => {
    fetchMeetingList();
  };

  return (
    <WidgetCard
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="Tenant"
      titleClassName="whitespace-nowrap"
      action={
        <div className="mt-2 flex justify-end">
          <ModalButton
            label="Add New Meeting"
            view={<CreateMeeting onClose={handlePopupClose}/>} />
        </div>
      }
    >
      <ControlledTable
        variant="modern"
        columns={visibleColumns}
        data={data}
        paginatorOptions={{
          pageSize,
          setPageSize,
          // total: totalItems,
          // current: currentPage,
          //onChange: (page: number) => handlePaginate(page),
        }}
      >

      </ControlledTable>
    </WidgetCard>
  );
}

