
'use client';

import WidgetCard from '@/components/cards/widget-card';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { getColumnsData } from './columns';
import ModalButton from '@/app/shared/modal-button';
import CreateJob from './create-job';
import { useQuery } from '@tanstack/react-query';
import { deleteJob, getJobList } from '../../../../../../services/jobPostingService'
// export type jobData = {
//   id: string;
//     jdFiles: string;
//     jobId: string;
//     jobName: string;
//     location: string;
// };
export const jobQueryKey = 'candidate-job-data';
export default function MyJobTable({ className }: { className?: string }) {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);



  const [data, setData] = useState<any>([]);

  useEffect(() => {
    jobList();
  }, []);

  useEffect(() => {
    handlePagination();
  }, [currentPage, pageSize, data]);


  const jobList = async () => {
    try {
      const response = await getJobList()
      console.log("job lis", response.data)
      if (response) {
        setData(response.data)
        console.log("data....", data);
        setTotalItems(response.data.length);
        setCurrentPage(1); 
      }
    } catch (error) {
      console.log("error", error)
    }

  }

  const handlePopupClose = () => {
    jobList();
  };

  const onDeleteItem = (id: any) => {
    console.log("tenat id", id)
    onDeleteJob(id);
    //tentantList();
  }

  async function onDeleteJob(id: any) {
    console.log("candidate id", id)
    console.log("delete the candidate......");
    try {
      const response = await deleteJob(id);
      if (response) {
        jobList();
        console.log("delete the candidate", response);

      }
    } catch (error) {
      console.log("error", error)
    }

  }


  const columns = getColumnsData({ handlePopupClose, onDeleteItem });
  const { visibleColumns } = useColumn(columns);

  const handlePagination = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(data.slice(startIndex, endIndex));
  };

  const handlePaginate = (page: any) => {
    console.log("pagination", page);
    setCurrentPage(page);
  };
  return (
    <WidgetCard className={className}
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="Jobs"
      titleClassName="whitespace-nowrap"
      action={
        <div className="mt-2 flex justify-end">
          <ModalButton
            label="Add New Job"
            view={<CreateJob onClose={handlePopupClose} />}

            customSize="600px"
            className="mt-0"
          />
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

        className="-mx-5 lg:-mx-7">

      </ControlledTable>

    </WidgetCard>
  )



















  //   const onHeaderCellClick = (value: string) => ({
  //     onClick: () => {
  //       handleSort(value);
  //     },
  //   });

  //   const onDeleteItem = useCallback((jobId: string) => {
  //     handleDelete(jobId);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);
  //   type jobData = {
  //     id: string;
  //     jdFiles: string;
  //     jobId: string;
  //     jobName: string;
  //     location: string;
  //   };

  //   // const [data, setData] = useState<jobData[]>([]);

  //   // useEffect(() => {
  //   //   fetch('http://127.0.0.1:5000/upload_job_data')
  //   //     .then((response) => response.json())
  //   //     .then((json) => {
  //   //       setData(json as jobData[]);
  //   //     })
  //   //     .catch((error) => console.error(error));
  //   // }, []);
  //   // const { data } = useQuery<jobData[]>({
  //   //   queryKey: [jobQueryKey],
  //   //   queryFn: async () => {
  //   //     const response = await fetch('http://127.0.0.1:5000/upload_job_data', {
  //   //       method: 'GET',
  //   //     });
  //   //     if (!response.ok) {
  //   //       throw new Error('Network response was not ok');
  //   //     }
  //   //     return (await response.json()) as unknown as jobData[];
  //   //   },
  //   //   // initialData: [],
  //   //   staleTime: Infinity,
  //   // });
  // const data : any =[];
  //   const {
  //     isLoading,
  //     tableData,
  //     currentPage,
  //     totalItems,
  //     handlePaginate,
  //     sortConfig,
  //     handleSort,
  //     selectedRowKeys,
  //     handleRowSelect,
  //     handleSelectAll,
  //     handleDelete,
  //     handleReset,
  //   } = useTable(data??[], pageSize);

  //   useEffect(() => {
  //     handleReset();
  //   }, [data]);

  //   const columns = useMemo(
  //     () =>
  //       getColumns({
  //         data: data??[],
  //         sortConfig,
  //         checkedItems: selectedRowKeys,
  //         onHeaderCellClick,
  //         onDeleteItem,
  //         onChecked: handleRowSelect,
  //         handleSelectAll,
  //       }),
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     [
  //       selectedRowKeys,
  //       onHeaderCellClick,
  //       sortConfig.key,
  //       sortConfig.direction,
  //       onDeleteItem,
  //       handleRowSelect,
  //       handleSelectAll,
  //     ]
  //   );

  //   const { visibleColumns } = useColumn(columns);
  //   return (
  //     <WidgetCard
  //       className={className}
  //       headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
  //       actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
  //       title="Jobs"
  //       titleClassName="whitespace-nowrap"
  //       action={
  //         <div className="mt-2 flex justify-end">
  //           <ModalButton
  //             label="Add New Job"
  //             view={<CreateJob />}
  //             customSize="600px"
  //             className="mt-0"
  //           />
  //         </div>
  //       }
  //     >
  //       <ControlledTable
  //         variant="modern"
  //         data={tableData}
  //         isLoading={isLoading}
  //         showLoadingText={true}
  //         // @ts-ignore
  //         columns={visibleColumns}
  //         paginatorOptions={{
  //           pageSize,
  //           setPageSize,
  //           total: totalItems,
  //           current: currentPage,
  //           onChange: (page: number) => handlePaginate(page),
  //         }}
  //         className="-mx-5 lg:-mx-7"
  //       />
  //     </WidgetCard>
  //   );
}