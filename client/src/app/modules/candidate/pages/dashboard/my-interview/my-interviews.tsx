'use client';
import { Button, Title } from 'rizzui';
import cn from '@/utils/class-names';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import ControlledTable from '@/components/controlled-table';
import Cookies from 'js-cookie';
import { getColumnsData } from './columns';
import { useColumn } from '@/hooks/use-column';


export default function MyInterviews() {
  const cookieValue: any = Cookies.get('candidate_details');
  const candidateDetails: any = cookieValue ? JSON.parse(cookieValue) : {};
  const InterviewDetails = candidateDetails.schedules
  console.log("candidate details", candidateDetails)
  const columns = getColumnsData(InterviewDetails);
  const { visibleColumns } = useColumn(columns);
  return (
    <WidgetCard
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title={candidateDetails.name}
      titleClassName="whitespace-nowrap"

    >
      <ControlledTable
        columns={visibleColumns}
        data={InterviewDetails}>
      </ControlledTable>
    </WidgetCard >
  );

}



