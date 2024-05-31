'use client';
import { Button, Title } from 'rizzui';
import cn from '@/utils/class-names';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getColumnsData } from './columns';
import { useColumn } from '@/hooks/use-column';
import WidgetCard from '@/components/cards/widget-card';
import ControlledTable from '@/components/controlled-table';

export default function MyDetails() {
  const cookieValue: any = Cookies.get('candidate_details');
  const candidateDetails: any = cookieValue ? JSON.parse(cookieValue) : {};
  console.log("candidate details", candidateDetails)
  const columns = getColumnsData(candidateDetails);
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
        data={[candidateDetails]}>
      </ControlledTable>
    </WidgetCard >
  );

}



