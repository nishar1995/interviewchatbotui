'use client';

import { useState, useEffect } from 'react';

import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/roles-permissions/users-table/columns';
import { getUsersList } from '@/services/userService';



export default function UsersTable() {
  const [pageSize, setPageSize] = useState(10);
  const columns = getColumns();
  const [data, setData] = useState([]);
  const { visibleColumns } = useColumn(columns);


  useEffect(() => {
    fetchQuestionsList();
  }, []);





  const fetchQuestionsList = async () => {
    const response = await getUsersList();
    console.log("fetch data", response.data);
    setData(response.data);
    console.log("data/////",data)
    // setTotalItems(response.data.length);
    // setCurrentPage(1);
  };


  
  return (
    <div className="mt-14">
      
      <ControlledTable
        variant="modern"
        data={data}
        showLoadingText={true}
        // @ts-ignore
       
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          //total: totalItems,
          //current: currentPage,
          //onChange: (page: number) => handlePaginate(page),
        }}
       
      />
    </div>
  );
}
