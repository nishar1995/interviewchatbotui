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
import CreateTenant from './create-application';
import CreateQuestions from './create-application';
import { getQuestions } from '../../../../../../services/tenantQuestionsService'


export const questionsQueryKey = 'questions-application-data';
export default function MyQuestionsTable({
}: {
    // Add return type annotation here
  }) {
  const columns = getColumnsData();
  const [pageSize, setPageSize] = useState(7);
  const { visibleColumns } = useColumn(columns);
  const [data, setData] = useState<any>([]);

  // useEffect(() => {
  //   const candidate = async () => {
  //     const response = await getQuestions();
  //     console.log("fetch data", response);
  //     setData(response.data)
  //   };
  //   candidate();
  // }, []);


  useEffect(() => {
    fetchQuestionsList(); // Initial fetch when the component mounts
  }, []);

  const fetchQuestionsList = async () => {
    const response = await getQuestions();
    console.log("fetch data", response);
    setData(response.data)


  }
  const handlePopupClose = () => {
    fetchQuestionsList();

  }
    return (
      <WidgetCard
        headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
        actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
        title="Tenant"
        titleClassName="whitespace-nowrap"
        action={
          <div className="mt-2 flex justify-end">
            <ModalButton
              label="Add New Questions"
              view={<CreateQuestions onClose={handlePopupClose}/>} />
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

// export default function MyApplicationsTable({
//   className,
// }: {
//   className?: string;
// }) {
//   const [pageSize, setPageSize] = useState(0);

//   const onHeaderCellClick = (value: string) => ({
//     onClick: () => {
//       handleSort(value);
//     },
//   });

//   const onDeleteItem = useCallback((applicationId: string) => {
//     handleDelete(applicationId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     debugger
//     setPageSize(7)
//   }, [pageSize]);

//   const data: any = [];
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
//   } = useTable(data ?? [], pageSize);

//   const columns = useMemo(
//     () =>
//       getColumns({
//         data: data ?? [],
//         sortConfig,
//         checkedItems: selectedRowKeys,
//         onHeaderCellClick,
//         onDeleteItem,
//         onChecked: handleRowSelect,
//         handleSelectAll,
//         selectedDateRange: [new Date(), new Date()],

//       }),

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
//       title="Candidates"
//       titleClassName="whitespace-nowrap"
//       action={
//         <div className="mt-2 flex justify-end">
//           <ModalButton
//             label="Add New Candidate"
//             view={<CreateApplication />}
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
// }


// 'use client';

// import WidgetCard from '@/components/cards/widget-card';
// import { useCallback, useState, useMemo, useEffect } from 'react';
// import { useColumn } from '@/hooks/use-column';
// import { useTable } from '@/hooks/use-table';
// import ControlledTable from '@/components/controlled-table';
// import { getColumns } from './columns';
// import ModalButton from '@/app/shared/modal-button';
// import CreateApplication from './create-application';
// import { queryOptions, useQuery } from '@tanstack/react-query';
// export type applicationData = {
//   id: string;
//   candidateFiles: string;
//   applicationId: string;
//   candidateName: string;
//   meetingSchedule: string;
// };

// export const applicationQueryKey = 'candidate-application-data';

// export default function MyApplicationsTable({
//   className,
// }: {
//   className?: string;
// }) {
//   const [pageSize, setPageSize] = useState(7);

//   const onHeaderCellClick = (value: string) => ({
//     onClick: () => {
//       handleSort(value);
//     },
//   });

//   const onDeleteItem = useCallback((applicationId: string) => {
//     handleDelete(applicationId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // {
//   //   "Id": 1,
//   //   "applicationId": "41072784-075d-4fa6-91cf-9325d48c66d3",
//   //   "candidateFiles": "C:\\Users\\Sanya\\Downloads\\Flask_Bot1\\Flask_Bot/tmp\\muskan12_3.pdf",
//   //   "candidateName": "Muskan arora",
//   //   "meetingSchedule": "11 april,24 6:00PM"
//   // },
//   const { data } = useQuery<applicationData[]>({
//     queryKey: [applicationQueryKey],
//     queryFn: async () => {
//       const response = await fetch(
//         'http://127.0.0.1:5000/upload_application_data',
//         { method: 'GET' }
//       );
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return (await response.json()) as applicationData[];
//     },

//     initialData: [],
//     staleTime: Infinity,
//   });
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
//   } = useTable([], pageSize);

//   useEffect(() => {
//     handleReset();
//   }, [data]);

//   const columns = useMemo(
//     () =>
//       getColumns({
//         data: data,
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
//       title="Candidates"
//       titleClassName="whitespace-nowrap"
//       action={
//         <div className="mt-2 flex justify-end">
//           <ModalButton
//             label="Add New Candidate"
//             view={<CreateApplication />}
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
// }
