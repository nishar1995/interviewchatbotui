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
import { deleteMeeting, getMeetingScheduleList } from '../../../../../../services/meetingScheduleService'

import CreateMeeting from '../../schedule-meeting/my-schedule-meeting/create-application'


export const meetingQueryKey = 'meeting-application-data';
export default function MyMeetingTable({
}: {
    // Add return type annotation here
  }) {
const [pageSize, setPageSize] = useState(5);
const [currentPage, setCurrentPage] = useState(1);
const [data, setData] = useState([]);
const [paginatedData, setPaginatedData] = useState([]);
const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchMeetingList();
  }, []);

  useEffect(() => {
    handlePagination();
  }, [currentPage, pageSize, data]);

  const fetchMeetingList = async () => {
    const response = await getMeetingScheduleList();
    console.log("fetch data", response);
    setData(response.data);
    setTotalItems(response.data.length);
    setCurrentPage(1);
  }
  const handlePopupClose = () => {
    fetchMeetingList();
  };


  const onDeleteItem = async (id: any) => {
    console.log("meeting id", id)
    console.log("delete the meeting......");
    try {
      const response = await deleteMeeting(id);
      if (response) {
        console.log("delete the meeting", response);
        fetchMeetingList();
      }
    } catch (error) {
      console.log("error", error)
    }

  }

  const handlePagination = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(data.slice(startIndex, endIndex));
  };

  const handlePaginate = (page:any) => {
    console.log("pagination", page);
    setCurrentPage(page);
  };

  const columns = getColumnsData({ handlePopupClose, onDeleteItem });
  const { visibleColumns } = useColumn(columns);
  return (
    <WidgetCard
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="Meeting Schedule"
      titleClassName="whitespace-nowrap"
      action={
        <div className="mt-2 flex justify-end">
          <ModalButton
            label="Add New Meeting"
            view={<CreateMeeting onClose={handlePopupClose} />} />
        </div>
      }
    >
      <ControlledTable
        variant="modern"
        columns={visibleColumns}
        data={paginatedData}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: handlePaginate,
        }}
      />

     
    </WidgetCard>
  );
}

