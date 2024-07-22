'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumnsData } from './columns';
import ModalButton from '@/app/shared/modal-button';
import CreateQuestions from './create-application';
import { deleteQuestion, getQuestions } from '../../../../../../services/tenantQuestionsService';
import { ActionIcon } from 'rizzui';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import ExpandedOrderRow from './expanded-row';

export const questionsQueryKey = 'questions-application-data';

function MyQuestionsTable() {
  const columns = getColumnsData();
  const { visibleColumns } = useColumn(columns);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);


  useEffect(() => {
    console.log("hr manager")
    fetchQuestionsList();
  }, []);


  useEffect(() => {
    handlePagination();
  }, [currentPage, pageSize, data]);


  const fetchQuestionsList = async () => {
    const response = await getQuestions();
    console.log("fetch data", response.data);
    setData(response.data);
    setTotalItems(response.data.length);
    setCurrentPage(1);
  };

  const handlePopupClose = () => {
    fetchQuestionsList();
  };

  const onDeleteItem = async (id: any) => {
    console.log("onclick delete");
    try {
      const response = await deleteQuestion(id);
      if (response) {
        console.log("deleted the question", response);
        fetchQuestionsList(); // Refresh list after deletion
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePagination = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(data.slice(startIndex, endIndex));
  };

  const handlePaginate = (page: any) => {
    console.log("pagination", page);
    setCurrentPage(page);
  };

  function CustomExpandIcon(props: any) {
    console.log("props.......", props);
    return (
      <ActionIcon
        size="sm"
        variant="outline"
        rounded="full"
        className="expand-row-icon ms-2"
        onClick={(e) => {
          props.onExpand(props.record?.application_id, e);
        }}
      >
        {props.expanded ? (
          <PiCaretUpBold className="h-3.5 w-3.5" />
        ) : (
          <PiCaretDownBold className="h-3.5 w-3.5" />
        )}
      </ActionIcon>
    );
  }

  return (
    <WidgetCard
      headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
      actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
      title="Questions"
      titleClassName="whitespace-nowrap"
      action={
        <div className="mt-2 flex justify-end">
          <ModalButton
            label="Add New Questions"
            view={<CreateQuestions onClose={handlePopupClose} />}
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
        expandable={{
          expandIcon: CustomExpandIcon,
          expandedRowRender: (record) => (
            <ExpandedOrderRow
            key={`expanded-${record.application_id}`} // Ensure unique key for expanded row
              data={record}
              handlePopupClose={handlePopupClose}
              onDeleteItem={onDeleteItem}
            />
          ),
        }}
        rowKey={(record) => record.application_id} // Ensure unique key for table rows
      />
    </WidgetCard>
  );
}

export default MyQuestionsTable;






// 'use client';

// import WidgetCard from '@/components/cards/widget-card';
// import { useCallback, useState, useMemo, useEffect } from 'react';
// import { useColumn } from '@/hooks/use-column';
// import { useTable } from '@/hooks/use-table';
// import ControlledTable from '@/components/controlled-table';
// import { getColumns, getColumnsData } from './columns';
// import ModalButton from '@/app/shared/modal-button';
// import CreateApplication from './create-application';
// import { useQuery } from '@tanstack/react-query';
// import CreateTenant from './create-application';
// import CreateQuestions from './create-application';
// import { deleteQuestion, getQuestions } from '../../../../../../services/tenantQuestionsService'
// import { ActionIcon } from 'rizzui';
// import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
// import ExpandedOrderRow from './expanded-row';



// export const questionsQueryKey = 'questions-application-data';
// export default function MyQuestionsTable({
// }: {
//     // Add return type annotation here
//   }) {
//   const columns = getColumnsData();
//   const [pageSize, setPageSize] = useState(7);
//   const { visibleColumns } = useColumn(columns);
//   const [data, setData] = useState<any>([]);

//   useEffect(() => {
//     fetchQuestionsList();
//   }, []);

//   const fetchQuestionsList = async () => {
//     const response = await getQuestions();
//     console.log("fetch data", response.data);
//     setData(response.data)


//   }
//   const handlePopupClose = () => {
//     fetchQuestionsList();

//   }

//   const onDeleteItem = async (id: any) => {
//     debugger
//     console.log("onclick dele")
//     try {
//       const response = await deleteQuestion(id);
//       if (response) {
//         console.log("delete the questions", response);
//       }
//     } catch (error) {
//       console.log("error", error)
//     }

//   }

//   function CustomExpandIcon(props: any) {
//     console.log("props.......", props)
//     return (
//       <ActionIcon
//         size="sm"
//         variant="outline"
//         rounded="full"
//         className="expand-row-icon ms-2"
//         onClick={(e) => {
//           props.onExpand(props.record?.application_id, e);

//         }}
//       >
//         {props.expanded ? (
//           <PiCaretUpBold className="h-3.5 w-3.5" />
//         ) : (
//           <PiCaretDownBold className="h-3.5 w-3.5" />
//         )}
//       </ActionIcon>
//     );
//   }
//   return (
//     <WidgetCard
//       headerClassName="mb-6 items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
//       actionClassName="grow @[57rem]:ps-11 ps-0 items-center w-full @[42rem]:w-full @[57rem]:w-auto "
//       title="Questions"
//       titleClassName="whitespace-nowrap"
//       action={
//         <div className="mt-2 flex justify-end">
//           <ModalButton
//             label="Add New Questions"
//             view={<CreateQuestions onClose={handlePopupClose} />} />
//         </div>
//       }
//     >
//       <ControlledTable
//         variant="modern"
//         columns={visibleColumns}
//         data={data}
//         paginatorOptions={{
//           pageSize,
//           setPageSize,
//           // total: totalItems,
//           // current: currentPage,
//           //onChange: (page: number) => handlePaginate(page),
//         }}
//         expandable={{
//           expandIcon: CustomExpandIcon,
//           expandedRowRender: (data) => <ExpandedOrderRow
//             data={data}
//             handlePopupClose={handlePopupClose}
//             onDeleteItem={onDeleteItem}
//           />,
//         }}

//       //    expandable={{
//       //   expandIcon: CustomExpandIcon,
//       //   expandedRowRender: (record) => <ExpandedOrderRow data={record} />,
//       //   rowExpandable: (record) => true, // Define condition for rows that can be expanded
//       //   expandedRowKeys: [expandedRow],
//       // }}
//       >

//       </ControlledTable>
//     </WidgetCard>
//   );
// }

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
//         'http://localhost:5000/upload_application_data',
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
